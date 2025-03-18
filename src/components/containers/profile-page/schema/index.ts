import { z } from "zod";

export const editProfileSchema = z.object({
        firstName: z.string().min(2),
        facebookName: z.string().min(2),
        pseudo: z.string().min(4),
        newPassword: z.string().optional(),
        confirmPassword: z.string().optional()
    })
    .refine( (data) => {
            if (data.newPassword && data.newPassword.trim().length != 0) {
                return data.newPassword.length >= 8;
            }
            
            return true;
        },
        {
            message: "Passwords is too short",
            path: ["newPassword"],
        }
    )
    .refine(
        (data) => {
            if (data.newPassword && data.newPassword.trim().length != 0 && data.confirmPassword) {
                return data.newPassword === data.confirmPassword;
            }
            
            return true;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    )
;