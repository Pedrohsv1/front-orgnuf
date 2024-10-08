import { useForm } from "react-hook-form";
import { ActivitieSchema } from "./schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "react-query";
import { PostToDo } from "@/api/toDos/post.todos";
import { Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { DialogFooter } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { PopoverLinks } from "./form-popover-link";
import { LinksForm } from "../activities/links-forms";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { PostActivitie } from "@/api/activities/post.activities";

interface FormModal {
  setOpen: () => void;
}

export interface ILink {
  link: string;
  name: string;
}

export const FormActivitie = ({ setOpen }: FormModal) => {
  const [links, setLinks] = useState<ILink[]>([]);
  const { mutate, isLoading, isError, isSuccess } = useMutation(PostActivitie, {
    onSuccess: () => {
      setOpen();
    },
  });

  const form = useForm<z.infer<typeof ActivitieSchema>>({
    resolver: zodResolver(ActivitieSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof ActivitieSchema>) {
    mutate({
      title: values.title,
      content: values.content,
      DeadLineStart: values.date.from,
      DeadLineEnd: values.date.to,
      links,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="título" {...field} />
              </FormControl>
              <FormDescription>Titulo da atividade.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descricão</FormLabel>
              <div className="text-sm text-bg-100/50">
                2000/
                <span
                  className={`${field.value?.length && field.value?.length < 1000 ? "text-actions-green" : field.value?.length && field.value?.length < 1900 ? "text-actions-yellow" : "text-actions-red"}`}
                >
                  {field.value?.length}
                </span>
              </div>
              <FormControl>
                <Textarea
                  maxLength={2000}
                  className="h-60 resize-none"
                  placeholder="Descricão"
                  {...field}
                />
              </FormControl>
              <FormDescription>Fale um pouco da atividade.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-col">
              <FormLabel>Data de Inicio e Entrega</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value && field.value.from && field.value.to ? (
                        <span>
                          {new Date(field.value.from).toLocaleDateString(
                            "pt-BR",
                            {
                              month: "numeric",
                              year: "numeric",
                              day: "2-digit",
                            },
                          )}{" "}
                          Até{" "}
                          {new Date(field.value.to).toLocaleDateString(
                            "pt-BR",
                            {
                              month: "numeric",
                              year: "numeric",
                              day: "2-digit",
                            },
                          )}
                        </span>
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="z-50 w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={3}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Aqui é o tempo para fazer a atividade do dia de inicio até o a
                entrega.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 flex flex-col gap-2 pb-2 pt-1">
          <PopoverLinks setLinks={setLinks} />
          {links && (
            <div className="flex gap-2">
              <LinksForm links={links} />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            variant={"default"}
            className={`transition-all ${isError ? "bg-transparent" : isSuccess && "bg-actions-green"} ${isSuccess || isError || isLoading ? "pointer-events-none" : ""}`}
            disabled={isLoading || isSuccess || isError}
          >
            {isLoading ? (
              <div className="size-4 animate-pulse rounded-full border-2 border-bg-100" />
            ) : isSuccess ? (
              <Check className="size-4 text-bg-100" />
            ) : isError ? (
              <div className="flex items-center gap-2">
                <Warning className="size-4 text-actions-red" />
                <p className="bg-bg-100/80 text-sm">
                  Tente novamente mais tarde
                </p>
              </div>
            ) : (
              "Criar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
