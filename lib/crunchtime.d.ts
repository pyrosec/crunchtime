import { BasePuppeteer } from "base-puppeteer";
export declare class Crunchtime extends BasePuppeteer {
    buildIndex({ output }: {
        output: any;
    }): Promise<void>;
    extractData(): Promise<any>;
    fetchIndex({ input, output }: {
        input: any;
        output: any;
    }): Promise<void>;
    nextPage(): Promise<boolean>;
    buildIndexForPage(): Promise<any>;
}
