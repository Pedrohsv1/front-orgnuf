"use client";

import { useUserAuthenticated } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

export default function authProtector(Component: () => JSX.Element) {
  return function authProtector(props: any) {
    const { toast } = useToast();
    const session = useUserAuthenticated();

    useEffect(() => {
      if (!session) {
        toast({
          title: "Direcionado ao login!",
          description:
            "Parece que ainda não é um usuário ou não loga faz tempo... tente refazer login ou se registrar",
        });
        redirect(`/login`);
      }
    }, []);

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}
