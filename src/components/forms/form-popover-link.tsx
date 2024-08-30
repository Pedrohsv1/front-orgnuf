import { ControllerRenderProps, Form, useForm } from "react-hook-form";

import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "../ui/label";
import { ILink } from "./form-activitie";
import { useToast } from "../ui/use-toast";
import { Paperclip } from "@phosphor-icons/react/dist/ssr";

interface IPopLink {
  setLinks: Dispatch<SetStateAction<ILink[]>>;
}

export const PopoverLinks = ({ setLinks }: IPopLink) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState({
    link: "",
    name: "",
  });

  function onSubmit() {
    if (link.link.length > 3 && link.name.length > 3) {
      setLinks((prev) => [...prev, link]);
      setLink({
        link: "",
        name: "",
      });
    } else {
      toast({
        title: "Nome ou link pequeno demais! Tente outra coisa",
        description:
          "O nome precisa de no mínimo 4 letras, do mesmo modo o link",
      });
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Paperclip className="size-4" /> <p>Adicionar um link</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-80 flex-col gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={link.name}
            onChange={(v) => setLink((l) => ({ ...l, name: v.target.value }))}
            defaultValue="100%"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            value={link.link}
            onChange={(v) => setLink((l) => ({ ...l, link: v.target.value }))}
            defaultValue="300px"
            className="col-span-2 h-8"
          />
        </div>
        <Button onClick={() => onSubmit()}>Adicionar</Button>
      </PopoverContent>
    </Popover>
  );
};
