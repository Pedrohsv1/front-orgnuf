import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const TVButtonIcon = tv({
  base: "size-8  flex items-center justify-center rounded-lg  ",
  variants: {
    typeButtonIcon: {
      base: "bg-bg-700 hover:bg-primary-500/20 text-bg-100 hover:text-primary-500",
      success:
        "bg-bg-700 hover:bg-actions-green/20 text-bg-100  hover:text-actions-green",
      delete: "hover:bg-actions-red/20 text-actions-red hover:text-actions-red",
      favorite:
        "hover:bg-actions-yellow/20 text-bg-100 hover:text-actions-yellow",
    },
    success: {
      true: "bg-actions-green text-bg-900",
    },
    deleteType: {
      true: "bg-actions-red",
    },
    favorite: {
      true: "bg-actions-yellow text-bg-900",
    },
  },
  defaultVariants: {
    typeButtonIcon: "base",
    deleteType: false,
    favorite: false,
    success: false,
  },
});

export type IButtonIcon = ComponentProps<"button"> &
  VariantProps<typeof TVButtonIcon>;

export const ButtonIcon = ({
  typeButtonIcon,
  success,
  favorite,
  deleteType,
  className,
  ...props
}: IButtonIcon) => {
  return (
    <button
      className={TVButtonIcon({
        success,
        deleteType,
        favorite,
        typeButtonIcon,
        className,
      })}
      {...props}
    >
      {props.children}
    </button>
  );
};
