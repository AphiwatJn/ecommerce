import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner"

type ButtonSize = "xs" | "sm" | "default" | "lg"
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

type ButtonWithIcon = "inline-start" | "inline-end"
type ButtonRounded = "default" | "rounded-full"

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  icon?: React.ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  withIcon?: ButtonWithIcon
  rounded?: ButtonRounded
  loading?: boolean
  fullWidth?: boolean
  asChild?: boolean
}

const iconSizeMap: Record<ButtonSize, string> = {
  xs: "icon-xs",
  sm: "icon-sm",
  default: "icon",
  lg: "icon-lg",
}

const CustomButton = React.forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(
  (
    {
      label,
      icon,
      size = "default",
      variant = "default",
      withIcon = "inline-start",
      rounded = "default",
      loading = false,
      fullWidth = false,
      asChild = false,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : Button

    const isIconOnly = !!icon && !label
    const computedSize = isIconOnly
      ? iconSizeMap[size]
      : size

    return (
      <Comp
        ref={ref}
        type={!asChild ? type : undefined}
        variant={!asChild ? variant : undefined}
        size={!asChild ? (computedSize as any) : undefined}
        disabled={!asChild ? disabled || loading : undefined}
        className={cn(
          "relative gap-2",
          fullWidth && "w-full",
          rounded === "rounded-full" && "rounded-full",
          className
        )}
        {...props}
      >
        {/* Spinner absolute center (no layout shift) */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </span>
        )}

        {/* Content wrapper */}
        <span
          className={cn(
            "flex items-center gap-2",
            loading && "opacity-0"
          )}
        >
          {isIconOnly ? (
            icon
          ) : (
            <>
              {withIcon === "inline-start" && icon}
              {label}
              {withIcon === "inline-end" && icon}
            </>
          )}
        </span>
      </Comp>
    )
  }
)

CustomButton.displayName = "CustomButton"

export default CustomButton