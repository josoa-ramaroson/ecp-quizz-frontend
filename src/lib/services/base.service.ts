"use client"

import { useAccessToken } from "@/store";
import { getClientApi } from "../utils";

export abstract class BaseService {
    static async makeRequests(url: string, method: string = 'GET', body?: any) {
        const { accessToken } = useAccessToken.getState();
        const api = getClientApi(accessToken);
        
        const requestOptions = {
            method,
            url,
            data: body
        };
        
        const { data } = await api.request(requestOptions);
        return data;
    }
}