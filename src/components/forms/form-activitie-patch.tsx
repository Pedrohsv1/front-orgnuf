import { useForm } from "react-hook-form";
import { ActivitieSchema, ActivitieSchemaPatch } from "./schemas";
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
import { Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { DialogFooter } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { PopoverLinks } from "./form-popover-link";
import { LinksForm } from "../activities/links-forms";
import { useContext, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { ActivitiesContext } from "../activities/activities";
import { PatchActivities } from "@/api/activities/patch.activities";
import { ActivitieContext } from "../activities/activitie";

export interface ILink {
  link: string;
  name: string;
}

export const FormActivitiePatch = () => {
  const { toast } = useToast();

  const activities = useContext(ActivitiesContext);
  const activitiesContext = useContext(ActivitieContext);

  const [links, setLinks] = useState<ILink[]>(
    activitiesContext?.activitie.links
      ? activitiesContext?.activitie.links
      : [],
  );

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    PatchActivities,
    {
      onSuccess: () => {
        activities?.refetch();
      },
      onError: (err) => {
        console.log(err);
        toast({
          title: "Erro ao editar atividade",
          description: "Tente novamente mais tarde",
        });
      },
    },
  );

  const form = useForm<z.infer<typeof ActivitieSchemaPatch>>({
    resolver: zodResolver(ActivitieSchemaPatch),
    defaultValues: {
      title: activitiesContext?.activitie.title
        ? activitiesContext?.activitie.title
        : "",
      content: activitiesContext?.activitie.content
        ? activitiesContext?.activitie.content
        : "",
    },
  });

  function onSubmit(values: z.infer<typeof ActivitieSchemaPatch>) {
    if (activitiesContext) {
      mutate({
        id: activitiesContext?.activitie.id,
        title: values.title,
        content: values.content,
        ...(values.date && {
          DeadLineStart: values.date.from ?? "",
          DeadLineEnd: values.date.to,
        }),
      });
    }
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
              <FormControl>
                <Textarea placeholder="Descricão" {...field} />
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
          {/* <PopoverLinks setLinks={setLinks} /> */}
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
