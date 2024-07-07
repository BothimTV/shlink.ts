import { shortUrlJson } from "../types/shortUrl";
import { Shlink } from "./Shlink";

let client: Shlink;
export class ShortUrl implements shortUrlJson {
    readonly shortCode: string;
    readonly shortUrl: string;
    longUrl: string;
    deviceLongUrls: {
        android: null | string;
        ios: null | string;
        desktop: null | string;
    };
    readonly dateCreated: Date;
    tags: string[];
    meta: {
        validSince: null | Date;
        validUntil: null | Date;
        maxVisits: null | number;
    };
    domain: string;
    title: string | null;
    crawlable: boolean;
    forwardQuery: boolean;
    visitsSummary: { total: number; nonBots: number; bots: number };
    visitsCount: number;

    constructor(json: shortUrlJson, shClient: Shlink) {
        this.shortCode = json.shortCode;
        this.shortUrl = json.shortUrl;
        this.longUrl = json.longUrl;
        this.deviceLongUrls = json.deviceLongUrls;
        this.dateCreated = new Date(json.dateCreated);
        this.tags = json.tags;
        this.meta = {
            validSince: json.meta.validSince ? new Date(json.meta.validSince) : null,
            validUntil: json.meta.validUntil ? new Date(json.meta.validUntil) : null,
            maxVisits: json.meta.maxVisits,
        };
        this.domain = json.domain;
        this.title = json.title;
        this.crawlable = json.crawlable;
        this.forwardQuery = json.forwardQuery;
        this.visitsSummary = json.visitsSummary;
        this.visitsCount = json.visitsCount;
        client = shClient;
    }

    /**
     * Delete this short url
     */
    public async delete(): Promise<void> {
        await client.api({
            method: "DELETE",
            url: `/rest/v3/short-urls/${this.shortCode}`
        })
    }

    private updateProps() {
        return {
            longUrl: this.longUrl,
            tags: this.tags,
            title: this.title,
            validSince: this.meta.validSince ? this.meta.validSince.toISOString() : null,
            validUntil: this.meta.validUntil ? this.meta.validUntil.toISOString() : null,
            maxVisits: this.meta.maxVisits,
            crawlable: this.crawlable,
            forwardQuery: this.forwardQuery,
            validateUrl: true,
            deviceLongUrls: this.deviceLongUrls
        }
    }

    private async updateThis(body: any): Promise<void> {
        const json = await client.api({
            method: "PATCH",
            url: `/rest/v3/short-urls/${this.shortCode}`,
            data: body
        }) as shortUrlJson;
        this.longUrl = json.longUrl,
            this.deviceLongUrls = json.deviceLongUrls,
            this.tags = json.tags,
            this.meta.maxVisits = json.meta.maxVisits,
            this.meta.validSince = json.meta.validSince ? new Date(json.meta.validSince) : null,
            this.meta.validUntil = json.meta.validUntil ? new Date(json.meta.validUntil) : null,
            this.domain = json.domain,
            this.title = json.title,
            this.crawlable = json.crawlable,
            this.forwardQuery = json.forwardQuery,
            this.visitsSummary = json.visitsSummary,
            this.visitsCount = json.visitsCount
    }

    /**
     * Set the long url for this short url 
     * @param longUrl 
     */
    public async setLongUrl(longUrl: string | URL): Promise<void> {
        var props = this.updateProps();
        props.longUrl = new URL(longUrl).href;
        return await this.updateThis(props);
    }

    /**
     * Set the tags for this short url
     * @param tags 
     */
    public async setTags(tags: string[]): Promise<void> {
        var props = this.updateProps();
        props.tags = tags;
        return await this.updateThis(props)
    }

    /**
     * Add a tag to this short url
     * @param tag 
     */
    public async addTag(tag: string): Promise<void> {
        var props = this.updateProps();
        props.tags.push(tag);
        return await this.updateThis(props)
    }

    /**
     * Remove a tag from this short url
     * @param tag 
     */
    public async removeTag(tag: string): Promise<void> {
        var props = this.updateProps();
        props.tags = props.tags.filter(t => t !== tag);
        return await this.updateThis(props)
    }

    /**
     * Set the title for this short url
     * @param title 
     */
    public async setTitle(title: string | null): Promise<void> {
        var props = this.updateProps();
        props.title = title;
        return await this.updateThis(props)
    }

    /**
     * Set the valid since date for this short url
     * @param date 
     */
    public async setValidSince(date: Date | null): Promise<void> {
        var props = this.updateProps();
        props.validSince = date ? date.toISOString() : null;
        return await this.updateThis(props)
    }

    /**
     * Set the valid until date for this short url
     * @param date 
     */
    public async setValidUntil(date: Date | null): Promise<void> {
        var props = this.updateProps();
        props.validUntil = date ? date.toISOString() : null;
        return await this.updateThis(props)
    }

    /**
     * Set the max visits for this short url
     * @param limit 
     */
    public async setMaxVisits(limit: number | null): Promise<void> {
        var props = this.updateProps();
        props.maxVisits = limit;
        return await this.updateThis(props)
    }

    /**
     * Set the crawlable flag for this short url
     * @param crawlable 
     */
    public async setCrawlable(crawlable: boolean): Promise<void> {
        var props = this.updateProps();
        props.crawlable = crawlable;
        return await this.updateThis(props)
    }

    /**
     * Set the forward query flag for this short url
     * @param forward 
     */
    public async setForwardQuarry(forward: boolean): Promise<void> {
        var props = this.updateProps();
        props.forwardQuery = forward;
        return await this.updateThis(props)
    }


    /**
     * Set the android redirect url for this short url
     * @param url 
     */
    public async setAndroidRedirectUrl(url: string | URL): Promise<void> {
        var props = this.updateProps();
        props.deviceLongUrls.android = new URL(url).href;
        return await this.updateThis(props)
    }

    /**
     * Set the ios redirect url for this short url
     * @param url 
     */
    public async setIosRedirectUrl(url: string | URL): Promise<void> {
        var props = this.updateProps();
        props.deviceLongUrls.ios = new URL(url).href;
        return await this.updateThis(props)
    }

    /**
     * Set the desktop redirect url for this short url
     * @param url 
     */
    public async setDesktopRedirectUrl(url: string | URL): Promise<void> {
        var props = this.updateProps();
        props.deviceLongUrls.desktop = new URL(url).href;
        return await this.updateThis(props)
    }

}
