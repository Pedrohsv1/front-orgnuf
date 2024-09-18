import { useForm } from "react-hook-form";
import { toDoPatchSchema } from "./schemas";
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
import { Button } from "../button/button";
import { useMutation } from "react-query";
import { Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { DialogFooter } from "../ui/dialog";
import { PatchToDos } from "@/api/toDos/patch.todos";
import { todo } from "node:test";
import { useContext } from "react";
import { ToDoC } from "../todos/toDo";
import { ToDoContext } from "../todos/toDos";

export const FormToDoPatch = () => {
  const contextValue = useContext(ToDoC);
  const contextAllValue = useContext(ToDoContext);

  const { mutate, isLoading, isError, isSuccess } = useMutation(PatchToDos, {
    onSuccess: () => {
      contextAllValue?.refetch();
    },
  });

  const form = useForm<z.infer<typeof toDoPatchSchema>>({
    resolver: zodResolver(toDoPatchSchema),
    defaultValues: {
      title: contextValue?.todo.title ? contextValue?.todo.title : "",
      content: contextValue?.todo.content ? contextValue?.todo.content : "",
    },
  });

  function onSubmit(values: z.infer<typeof toDoPatchSchema>) {
    if (contextValue) {
      mutate({
        id: contextValue?.todo.id,
        title: values.title,
        content: values.content,
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
              <FormDescription>
                Esse é o título da tarefa: O mais importante.
              </FormDescription>
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
                <Input placeholder="Descricão" {...field} />
              </FormControl>
              <FormDescription>Esse é o seu nome público.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
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
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
