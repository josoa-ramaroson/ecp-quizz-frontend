"use client"
import { EErrorMessage } from "@/enums";
import { MembersService } from "@/lib/services";
import { decodeJwt } from "@/lib/utils";
import { useAccessToken, useMemberStore } from "@/store";
import { TEditFormSchema, TEditProfileDto } from "@/types";
import { useCallback, useState } from "react";

export function useMember() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { accessToken, setAccessToken } = useAccessToken();
    const { setMember } = useMemberStore();
    const refreshMember = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            setAccessToken(accessToken);
            
            if (accessToken){
                const decodedToken = decodeJwt(accessToken);
                const memberId = decodedToken?.sub;
                if (!memberId) {
                    throw new Error(EErrorMessage.UNAUTHORIZED_ERROR);
                }
                const member = await MembersService.getMemberInfoFromToken(memberId);

                setMember(member);
            }

        } catch (error) {
            setError(error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR));
        } finally { 
            setIsLoading(false);
        }
    }, []);


    const updateMemberProfile = useCallback(async (data: TEditFormSchema) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const updateData: TEditProfileDto = {
                firstName: data.firstName,
                facebookName: data.facebookName,
                pseudo: data.pseudo,
            };
            
            if (data.newPassword && data.newPassword.length > 0) {
                updateData.password = data.newPassword;
            }

            const member = await MembersService.updateProfile(updateData);
            setMember(member);
          
        } catch (error) {
            setError(error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR));
            throw error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR)
        } finally { 
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        refreshMember,
        updateMemberProfile,
    }
}