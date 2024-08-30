"use client";
import { FormLogin } from "@/components/forms/form-login";
import { Book } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

function Login() {
  return (
    <main className="grid h-screen w-screen grid-cols-2 gap-4 bg-bg-900 p-4">
      <div className="relative flex overflow-hidden rounded-lg">
        <Image
          src={"/login.jpg"}
          alt={"Um jovem estudando"}
          quality={100}
          objectFit="cover"
          sizes="100%"
          fill
          className="h-full w-full"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex">
          <Book className="size-8 text-primary-500" />
          <h1 className="mb-12 text-3xl font-extrabold text-bg-100">Orgnuf</h1>
        </div>
        <FormLogin />
      </div>
    </main>
  );
}

export default Login;
