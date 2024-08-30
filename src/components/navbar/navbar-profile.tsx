import { DotsThreeVertical, Person } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export type INavbarProfile = {
  name: string;
};

export const NavbarProfile = ({ name }: INavbarProfile) => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-bg-700">
          <Person weight="fill" className="size-4 text-primary-400" />
        </div>
        <p className="bold text-base font-bold text-bg-100">{name}</p>
      </div>
      <div className="flex size-8 items-center justify-center rounded-lg hover:bg-bg-700/40">
        <DotsThreeVertical className="size-4 text-bg-100" />
      </div>
    </div>
  );
};
