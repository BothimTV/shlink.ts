import axios, { AxiosError, RawAxiosRequestConfig } from "axios";
import { ShortUrlBuilder } from "../builder/ShortUrlBuilder";
import { healthJson } from "../types/health";
import { ShortUrlOrderTypes, StatsTagOrderType, TagOrderType } from "../types/orderType";
import { shortUrlJson, shortUrlListJson } from "../types/shortUrl";
import { tagListJson } from "../types/tag";
import { totalVisitsJson } from "../types/visits";
import { ShortUrl } from "./ShortUrl";
import { Tag } from "./Tag";

export class Shlink {

    protected apiKey: string;
    private host: URL;

    constructor(host: string | URL, apiKey: string) {
        this.apiKey = apiKey
        this.host = new URL(host)
    }

    /**
     * Send a request to the API
     * @param options 
     * @returns 
     */
    public async api(options: RawAxiosRequestConfig): Promise<unknown> {
        options.headers = options.headers ?? {}
        options.headers["X-Api-Key"] = this.apiKey
        options.url = new URL(this.host.origin + options.url).href
        return await axios.request(options)
            .then(res => res.data)
            .catch(e => {
                const err = e as AxiosError
                throw err.response?.data
            })
    }

    /**
     * Get all short urls from this server  
     * This will return 10 items per page by default  
     * @returns
     */
    public async getShortUrls(page?: number, itemsPerPage?: number, searchTerm?: string, tags?: string[], tagsMode?: "any" | "all", orderBy?: ShortUrlOrderTypes, startDate?: Date, endDate?: Date, excludeMaxVisitsReached?: boolean, excludePastValidUntil?: boolean): Promise<{ page: number, maxPages: number, urls: ShortUrl[] }> {
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
            url: url.href.replace("https://example.com", "")
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

    /**
     * Get the health status of the server 
     * @returns 
     */
    public async health(): Promise<healthJson> {
        return await this.api({
            method: "GET",
            url: "/rest/health"
        })
            .then((res) => {
                console.debug(res)
                return res as healthJson
            })
            .catch((e) => {
                console.error(e)
                return (e as AxiosError).response?.data as healthJson
            })
    }

    /**
     * Check if the server is healthy
     * @returns 
     */
    public async healthy(): Promise<boolean> {
        return await this.health().then(res => res.status == "pass")
    }

    /**
     * Get all tags from this server  
     * 
     * Important! Ordering by shortUrlsCount, visits or nonBotVisits has a known performance issue which makes loading a subset of the list take as much as loading the whole list.  
     * @returns 
     */
    public async getTags(includeStats?: boolean, page?: number, itemsPerPage?: number, searchTerm?: string, orderBy?: TagOrderType | StatsTagOrderType): Promise<{ page: number, maxPages: number, tags: Tag[] }> {
        const url = new URL(`https://example.com/rest/v3/tags/${includeStats ? "stats" : ""}`)
        if (page) url.searchParams.set("page", page.toString());
        if (itemsPerPage) url.searchParams.set("itemsPerPage", itemsPerPage.toString());
        if (searchTerm) url.searchParams.set("searchTerm", searchTerm);
        if (orderBy) url.searchParams.set("orderBy", orderBy);
        const res = await this.api({
            url: url.href.replace("https://example.com", "")
        }) as tagListJson;
        return {
            page: res.shortUrls.pagination.currentPage,
            maxPages: res.shortUrls.pagination.pagesCount,
            tags: res.shortUrls.data.map(item => new Tag(item, this))
        }
    }

    /**
     * Rename a tag of this server
     */
    public async renameTag(tag: string | Tag, newName: string): Promise<void> {
        await this.api({
            method: "PUT",
            url: `/rest/v3/tags`,
            data: {
                oldName: typeof tag == "string" ? tag : tag.tag,
                newName: newName
            }
        })
    }

    /**
     * Delete tags from this server
     */
    public async deleteTags(tags: Array<string | Tag>): Promise<void> {
        const tagList: Array<string> = []
        tags.forEach(tag => {
            if (typeof tag === "string") tagList.push(tag)
            else tagList.push(tag.tag)
        })
        await this.api({
            method: "DELETE",
            url: `/rest/v3/tags`,
            data: {
                tags: tagList
            }
        })
    }

    /**
     * Get the visit count from this server
     */
    public async getVisitCount(): Promise<totalVisitsJson> {
        return await this.api({
            method: "GET",
            url: `/rest/v3/visits`
        }) as totalVisitsJson;
    }

}