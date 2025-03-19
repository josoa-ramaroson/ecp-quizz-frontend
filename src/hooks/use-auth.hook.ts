"use client"
import { EErrorMessage, EToastMessage } from "@/enums";
import { AuthService, MembersService } from "@/lib/services";
import { decodeJwt } from "@/lib/utils";
import { useAccessToken, useMemberStore } from "@/store";
import { TLoginFormData } from "@/types";
import { useCallback,  useState } from "react";
import toast from "react-hot-toast";

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { setAccessToken } = useAccessToken();
    const { setMember } = useMemberStore();
    const login = useCallback(async (credentials: TLoginFormData) => {
        try {
            setIsLoading(true);
            setError(null);
            credentials.pseudo = credentials.pseudo.trim();
            const accessToken = await AuthService.login(credentials);
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
            toast.success(EToastMessage.CONNECTED);

        } catch (error) {
            setError(error instanceof Error ? error : new Error(EErrorMessage.UNAUTHORIZED_ERROR));
            toast.error(error instanceof Error ? error.message : EErrorMessage.UNAUTHORIZED_ERROR);
        } finally { 
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setAccessToken(null);
        setMember(null);
    }
    , [setAccessToken, setMember]);

   
    return {
        isLoading,
        error,
        login,
        logout,
    }
}