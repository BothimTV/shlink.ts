import { domainJson } from "../types/domain";
import { Shlink } from "./Shlink";

let client: Shlink
export class Domain implements domainJson {
    readonly domain: string;
    readonly isDefault: boolean;
    redirects: {
        baseUrlRedirect: null | string;
        regular404Redirect: null | string;
        invalidShortUrlRedirect: null | string;
    };

    constructor(domain: domainJson, shClient: Shlink) {
        this.domain = domain.domain;
        this.isDefault = domain.isDefault;
        this.redirects = domain.redirects;
        client = shClient;
    }

    private updateProps() {
        return {
            domain: this.domain,
            baseUrlRedirect: this.redirects.baseUrlRedirect,
            regular404Redirect: this.redirects.regular404Redirect,
            invalidShortUrlRedirect: this.redirects.invalidShortUrlRedirect
        }
    }
    private async updateThis(props: any) {
        const res = await client.api({
            method: "PATCH",
            url: `/rest/v3/domains/redirects`,
            data: props
        }) as {
            baseUrlRedirect: null | string;
            regular404Redirect: null | string;
            invalidShortUrlRedirect: null | string;
        }
        this.redirects = res;
    }

    /**
     * Set the base redirect for this domain
     */
    public async setBaseRedirect(redirect: string | URL): Promise<void> {
        var props = this.updateProps();
        props.baseUrlRedirect = new URL(redirect).href
        await this.updateThis(props)
    }

    /**
     * Set the 404 redirect for this domain
     */
    public async set404Redirect(redirect: string | URL): Promise<void> {
        var props = this.updateProps();
        props.regular404Redirect = new URL(redirect).href
        await this.updateThis(props)
    }

    /**
     * Set the invalid redirect for this domain
     */
    public async setInvalidRedirect(redirect: string | URL): Promise<void> {
        var props = this.updateProps();
        props.invalidShortUrlRedirect = new URL(redirect).href
        await this.updateThis(props)
    }

    



}