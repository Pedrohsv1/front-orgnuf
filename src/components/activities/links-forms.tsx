import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

interface ILinks {
  links: {
    name: string;
    link: string;
  }[];
}

export const LinksForm = ({ links }: ILinks) => {
  return (
    <>
      {links.map((l, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                target="_blank"
                href={l.link}
                className="rounded-lg bg-primary-500/20 px-1.5 py-0.5 text-sm transition-all hover:bg-primary-500/40"
              >
                {l.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{l.link}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
};
