import { Visit, visitListJson } from "..";
import { statsTagJson } from "../types/tag";
import { Shlink } from "./Shlink";

let client: Shlink;
export class Tag {

    public tag: string
    public readonly shortUrlsCount?: number
    public readonly visitsSummary?: {
        readonly total: number,
        readonly nonBots: number,
        readonly bots: number
    }

    constructor(tag: string | statsTagJson, shClient: Shlink) {
        if (typeof tag == "string") {
            this.tag = tag
        } else {
            this.tag = tag.tag
            this.shortUrlsCount = tag.shortUrlsCount
            this.visitsSummary = tag.visitsSummary
        }
        client = shClient;
    }

    /**
     * Rename this tag
     */
    public async rename(newName: string): Promise<void> {
        await client.renameTag(this, newName)
        this.tag = newName
    }

    /**
     * Delete this tag
     */
    public async delete(): Promise<void> {
        await client.deleteTags([this])
    }

    /**
     * Get the visits from this tag
     */
    public async getVisits(startDate?: Date, endDate?: Date, page?: number, itemsPerPage?: number, excludeBots?: boolean): Promise<{ page: number, maxPages: number, visits: Visit[] }> {
        const url = new URL(`https://example.com/rest/v3/tags/${this.tag}/visits`)
        if (startDate) url.searchParams.set("startDate", startDate.toISOString());
        if (endDate) url.searchParams.set("endDate", endDate.toISOString());
        if (page) url.searchParams.set("page", page.toString());
        if (itemsPerPage) url.searchParams.set("itemsPerPage", itemsPerPage.toString());
        if (excludeBots) url.searchParams.set("excludeBots", excludeBots.toString())
        const res = await client.api({
            url: url.href.replace("https://example.com", "")
        }) as visitListJson;
        return {
            page: res.visits.pagination.currentPage,
            maxPages: res.visits.pagination.pagesCount,
            visits: res.visits.data.map(item => new Visit(item))
        }
    }

}