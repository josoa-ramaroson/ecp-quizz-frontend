import { TPersonalStats } from "@/types";
import { BaseService } from "./base.service";

export class StatsService extends BaseService {
    static async getPersonalStats(): Promise<TPersonalStats> {
        return await this.makeRequests("/stats/personal");
    }
}