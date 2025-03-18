"use client"

import { EErrorMessage } from "@/enums";
import { getClientApi } from "@/lib/utils";
import { TLoginFormData } from "@/types";

export class AuthService {


    static async login(loginData: TLoginFormData): Promise<string | null> {
        try {
            const api = getClientApi();
            const response = await api.post(
                "auth/login",
                loginData
            );
            
            const { accessToken } =  response.data;
            return accessToken;
        } catch (error) {
            if (error instanceof Error)
                throw new Error(error.message);
            else 
                throw new Error(EErrorMessage.UNKOWN_ERROR);
        }
    }
}