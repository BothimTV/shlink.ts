import axios, { RawAxiosRequestConfig } from "axios";
import { ShortUrlBuilder } from "../builder/ShortUrlBuilder";
import { OrderTypes } from "../types/orderType";
import { shortUrlJson, shortUrlListJson } from "../types/shortUrl";
import { ShortUrl } from "./ShortUrl";

export class Shlink {

    protected apiKey: string;
    private host: URL;

    constructor(host: string | URL, apiKey: string) {
        this.apiKey = apiKey
        this.host = new URL(host)
    }

    public async api(options: RawAxiosRequestConfig): Promise<unknown> {
        options.headers = options.headers ?? {}
        options.headers["X-Api-Key"] = this.apiKey
        options.baseURL = new URL(this.host.origin + options.baseURL).href
        return await axios.request(options)
            .then(res => res.data)
            .catch(e => { throw new Error(`Axios error: ${e}`) })
    }

    /**
     * Get all short urls from this server  
     * This will return 10 items per page by default  
     * @returns
     */
    public async getShortUrls(page?: number, itemsPerPage?: number, searchTerm?: string, tags?: string[], tagsMode?: "any" | "all", orderBy?: OrderTypes, startDate?: Date, endDate?: Date, excludeMaxVisitsReached?: boolean, excludePastValidUntil?: boolean): Promise<{page: number, maxPages:number, urls: ShortUrl[]}> {
        const url = new URL("https://example.com/rest/v3/short-urls")
        if (page) url.searchParams.set("page", page.toString());
        if (itemsPerPage) url.searchParams.set("itemsPerPage", itemsPerPage.toString());
        if (searchTerm) url.searchParams.set("searchTerm", searchTerm);
        if (tags) url.searchParams.set("tags", tags.join(","));
        if (tagsMode) url.searchParams.set("tagsMode", tagsMode);
        if (orderBy) url.searchParams.set("orderBy", orderBy);
        if (startDate) url.searchParams.set("startDate", startDate.toISOString());
        if (endDate) url.searchParams.set("endDate", endDate.toISOString());
        if (excludeMaxVisitsReached) url.searchParams.set("excludeMaxVisitsReached", excludeMaxVisitsReached.toString());
        if (excludePastValidUntil) url.searchParams.set("excludePastValidUntil", excludePastValidUntil.toString());
        const res = await this.api({
            baseURL: url.href.replace("https://example.com", "")
        }) as shortUrlListJson;
        return {
            page: res.shortUrls.pagination.currentPage,
            maxPages: res.shortUrls.pagination.pagesCount,
            urls: res.shortUrls.data.map(item => new ShortUrl(item, this))
        }
    }

    /**
     * Get a specific short url
     * @param shortCode 
     * @returns 
     */
    public async getShortUrl(shortCode: string): Promise<ShortUrl> {
        const res = await this.api({
            method: "GET",
            url: `/rest/v3/short-urls/${shortCode}`
        }) as shortUrlJson
        return new ShortUrl(res, this)
    }

    /**
     * Create a new short url
     * @param shortUrlBuilder 
     * @returns
     */
    public async createShortUrl(shortUrlBuilder: ShortUrlBuilder): Promise<ShortUrl> {
        const res = await this.api({
            method: "POST",
            url: "/rest/v3/short-urls",
            data: shortUrlBuilder
        }) as shortUrlJson
        return new ShortUrl(res, this)
    }

}