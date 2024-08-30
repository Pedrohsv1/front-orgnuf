import {
  Notepad,
  Pencil,
  PencilRuler,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { NavbarProfile } from "./navbar-profile";
import { NavbarLink } from "./navbar-link";
import { DialogCreateTodo } from "../todos/dialog-todo/dialog-create-todo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex h-screen w-[345px] flex-col gap-4 bg-bg-800 p-8">
      <NavbarProfile name={"Pedro Varela"} />

      <div className="h-[1px] w-full bg-bg-700"></div>
      <div className="flex flex-col gap-2">
        <NavbarLink
          iconRight={<Notepad className="size-4" />}
          createButton={true}
          title="Tarefas"
        >
          <DialogCreateTodo
            refetch={() => {
              location.reload();
            }}
          />
        </NavbarLink>
        <NavbarLink
          iconRight={<PencilRuler className="size-4" />}
          createButton={true}
          title="Atividades"
        ></NavbarLink>
        <NavbarLink
          iconRight={<Stack className="size-4" />}
          createButton={true}
          title="Metas"
        ></NavbarLink>
      </div>
      <div className="h-[1px] w-full bg-bg-700"></div>
      <button className="group flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-lg p-2 hover:bg-bg-900">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-bg-700 group-hover:bg-actions-green/20 group-hover:text-actions-green">
            <Pencil className="size-4" />
          </div>
          <p className="text-sm text-bg-100">Editar Horário</p>
        </div>
      </button>
    </nav>
  );
};
