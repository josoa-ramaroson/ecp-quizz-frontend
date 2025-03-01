import { EButtonVariant } from "@/enums";

type TVariantState = {
    enabled: string;
    disabled: string;
}

export type TButtonVariantStyle = Record<EButtonVariant, TVariantState>;


