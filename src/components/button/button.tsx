import React, { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const TVButton = tv({
  base: "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background h-10 flex items-center font-bold justify-center text-sm px-4 bg-primary-500 hover:bg-primary-500/90 active:bg-primary-400 rounded-lg text-bg-100",
  variants: {
    ghost: {
      true: "bg-transparent hover:bg-bg-800 border border-primary-500 rounded-lg ",
    },
  },

  defaultVariants: {
    ghost: false,
  },
});

export type IButton = ComponentProps<"button"> & VariantProps<typeof TVButton>;

export const Button = ({ ghost, children, className, ...props }: IButton) => {
  return (
    <button className={TVButton({ ghost, className })} {...props}>
      {children}
    </button>
  );
};
