# crunchtime

Harvest profile data from crunchbase.

## Usage

Create a crunchbase trial account using a privacy.com card and a Google account (close the card once the account is created).

Install crunchtime

```sh
npm install -g
```

Optionally configure environment variables `PROXY6_API_KEY` and `PROXY6_PROXY` to use crunchtime with a proxy automatically when starting crunchtime with the `--proxy-server` flag.

Start the crunchtime server with

```sh

crunchtime start-server --no-headless --proxy-server 'proxy6:buy:ipv6:us'

```

Navigate to this crunchbase view (replace with your own search filters)

[https://www.crunchbase.com/search/principal.investors/field/hubs/org_num_lead_investors/new-york-blockchain-companies](https://www.crunchbase.com/search/principal.investors/field/hubs/org_num_lead_investors/new-york-blockchain-companies)

Scrape the search results with

```sh
crunchtime --remote-port 8080 build-index --output crunchindex.json
```

Once you have an acceptable JSON with a result set from the crunchbase search, you can begin processing that JSON to populate with individual profile data.

```sh
crunchtime --remote-port 8080 fetch-index --input crunchindex.json --output crunchdata.json
```

If the program is interrupted, you can restart the scraping as needed, and it iwll pick up where it left off, assuming the input and output files are the same ones targeted previously.

You may have to solve a captcha in some instances. While crunchtime is running in server mode it should allow you to solve them as needed.


## Author

Pyrosec Labs

