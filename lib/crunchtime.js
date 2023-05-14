"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crunchtime = void 0;
const base_puppeteer_1 = require("base-puppeteer");
const fs_extra_1 = __importDefault(require("fs-extra"));
class Crunchtime extends base_puppeteer_1.BasePuppeteer {
    async buildIndex({ output }) {
        const page = this._page;
        let data = [];
        do {
            data = data.concat(await this.buildIndexForPage());
            this.logger.info(data);
            await this.timeout({ n: 5000 });
        } while (await this.nextPage());
        await fs_extra_1.default.writeFile(output, JSON.stringify(data, null, 2));
    }
    async extractData() {
        const page = this._page;
        return await page.evaluate(() => {
            const querySelector = (tag) => document.querySelector(tag) || { innerText: "" };
            const name = querySelector(".identifier-nav h1").innerText;
            const description = querySelector("description-card").innerText;
            const [location, size, type, stage, homepage] = querySelector("fields-card").innerText.split("\n");
            const contact = querySelector("contact-details").innerText.split("\n");
            return {
                name,
                description,
                location,
                size,
                type,
                stage,
                homepage,
                contact,
            };
        });
    }
    async fetchIndex({ input, output }) {
        const data = (await fs_extra_1.default.exists(output))
            ? JSON.parse(await fs_extra_1.default.readFile(output, "utf8"))
            : JSON.parse(await fs_extra_1.default.readFile(input, "utf8"));
        for (const item of data) {
            if (item.data)
                continue;
            await this.goto({ url: item.href });
            try {
                await this.waitForSelector({ selector: ".identifier-nav h1" });
                await this.timeout({ n: 1000 });
                item.data = await this.extractData();
                await fs_extra_1.default.writeFile(output, JSON.stringify(data, null, 2));
            }
            catch (e) {
                this.logger.error(e);
            }
        }
    }
    async nextPage() {
        if (await this._page.evaluate(() => {
            return Boolean(document.querySelector("results-info a:nth-child(2)").ariaDisabled ===
                "false");
        })) {
            await this.click({ selector: "results-info a:nth-child(2)" });
            return true;
        }
        return false;
    }
    async buildIndexForPage() {
        const page = this._page;
        return await page.evaluate(() => [].slice
            .call(document.querySelectorAll('grid-row a[role="link"]'))
            .map((v) => ({ name: v.title, href: v.href })));
    }
}
exports.Crunchtime = Crunchtime;
//# sourceMappingURL=crunchtime.js.map