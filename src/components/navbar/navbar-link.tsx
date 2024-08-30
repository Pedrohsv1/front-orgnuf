import React, { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { ButtonIcon } from "../button/button-icon";

const TVNavLink = tv({
  base: "h-12 w-full p-2 hover:bg-bg-900 rounded-lg cursor-pointer group flex items-center gap-2 justify-between",
});

export type INavbarLink = ComponentProps<"a"> & {
  iconRight: React.ReactNode;
  createButton?: boolean;
  title?: string;
};

export const NavbarLink = ({
  iconRight,
  createButton,
  title,
  children,
  className,
  ...props
}: INavbarLink) => {
  return (
    <a {...props} className={TVNavLink(className)}>
      <div className="flex items-center gap-2">
        <ButtonIcon className="group-hover:bg-primary-500/20 group-hover:text-primary-500">
          {iconRight}
        </ButtonIcon>
        <p className="text-sm text-bg-100">{title}</p>
      </div>
      {children}
    </a>
  );
};
