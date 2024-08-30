"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "./schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../button/button";
import { Input } from "../ui/input";
import { useMutation } from "react-query";
import { LoginAPI } from "@/api/auth/login";
import { ErrorBack } from "@/api/promise.type";
import { redirect } from "next/navigation";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";

export const FormLogin = () => {
  const { toast } = useToast();
  const { mutate, isLoading, isSuccess, isError } = useMutation(LoginAPI, {
    onSuccess: (data) => {
      Cookies.set("token", data.result.token);
      toast({
        title: "Login Concluído!",
        description: "Simbora!",
      });
    },
    onError: (error: ErrorBack) => {
      if (error.response.data.err.status == 404) {
        toast({
          title: "Login incorreto!",
          description: "Senha ou username incorretos, tente novamente.",
          variant: "destructive",
        });
      } else if (error.response.data.err.status == 500) {
        toast({
          title: "Error no servidor",
          description:
            "Tente novamente mais tarde! nossa equipe deve trabalhar nisso.",
          variant: "destructive",
        });
      }
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate({
      username: values.username,
      password: values.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      redirect("/");
    }
  }, [isSuccess]);

  return (
    <div className="flex w-[400px] flex-col items-center justify-center gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>Esse é o seu nome público.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormDescription>Senha da conta.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`transition-all ${isSuccess && "bg-actions-green"} ${isSuccess || isLoading ? "pointer-events-none" : ""}`}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <div className="size-4 animate-pulse rounded-full border-2 border-bg-100" />
            ) : isSuccess ? (
              <Check className="size-4 text-bg-100" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
