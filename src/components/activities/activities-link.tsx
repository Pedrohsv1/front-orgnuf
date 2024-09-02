import { Links } from "@/api/promise.type";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

interface ILinks {
  links: Links[];
}

export const ActivitiesLink = ({ links }: ILinks) => {
  return (
    <>
      {links.map((l) => (
        <TooltipProvider key={l.id}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                target="_blank"
                id={l.id}
                href={l.link}
                className="rounded-lg bg-primary-500/20 px-1.5 py-0.5 text-sm transition-all hover:bg-primary-500/40"
              >
                {l.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {l.link.length > 25 ? `${l.link.substring(0, 25)}...` : l.link}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
};
