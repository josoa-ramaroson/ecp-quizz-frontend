"use client"

import { TEditProfileDto } from "@/types";
import { BaseService } from "./base.service";

export class MembersService extends  BaseService {
    static readonly BASE_URI = "/members";

    static async getMemberInfoFromToken( id: string ) {
        const data =  await this.makeRequests(`${this.BASE_URI}/${id}`);
        return data;
    }

    static async updateProfile( editData: TEditProfileDto ) {
        const data  =  await this.makeRequests(`${this.BASE_URI}/profile`, "PUT", editData);
        return data;
    }
}