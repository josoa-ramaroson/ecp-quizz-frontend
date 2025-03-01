import React, { ReactElement } from "react";
import { EButtonSize, EButtonVariant } from "@/enums";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { TButtonVariantStyle } from "@/types";
import { BUTTON_SIZE_CLASSNAME, BUTTON_VARIANT_CLASSNAME } from "./constants";

type ButtonProps = {
  label?: string;
  icon?: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  className?: string;
  variant: EButtonVariant;
  size: EButtonSize;
};

export default function Button({
  label,
  icon,
  onClick,
  disabled = false,
  iconPosition = "left",
  isLoading = false,
  className = "",
  variant,
  size,
}: ButtonProps) {
  const variantStyles = BUTTON_VARIANT_CLASSNAME[variant] || BUTTON_VARIANT_CLASSNAME[EButtonVariant.PRIMARY];
  const sizeStyles = BUTTON_SIZE_CLASSNAME[size] || BUTTON_SIZE_CLASSNAME[EButtonSize.MEDIUM];

  const isButtonDisabled = disabled || isLoading;
  const stateStyles = isButtonDisabled ? variantStyles.disabled : variantStyles.enabled;

  const renderContent = () => {
  
    return (
      <>{isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
        {!isLoading && ((icon && iconPosition ) === "left") && <span className="mr-2">{icon}</span>}
        {label && <span>{label}</span>}
        {!isLoading && icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={isButtonDisabled}
      className={clsx(
          className,
          "flex items-center justify-center gap-2 transition-all duration-200  rounded-xl",
          stateStyles,
          sizeStyles,
          {'opacity-60 pointer-events-none': isLoading},
      )}
    >
      {renderContent()}
    </button>
  );
}
