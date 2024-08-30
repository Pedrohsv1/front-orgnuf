import { addDays } from "date-fns";
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(6, "Por favor, escreva um username com mais de 6 caracteres")
    .max(100, "No maáximo 100 caracteres"),
  password: z
    .string()
    .min(6, "Por favor, escreva um username com mais de 6 caracteres")
    .max(100, "No maáximo 100 caracteres"),
});

export const toDoSchema = z.object({
  title: z
    .string()
    .min(3, "Por favor, escreva uma tarefa com mais digitos")
    .max(100, "Limite de caracteres ultrapassados"),
  content: z
    .string()
    .min(6, "Por favor, escreva uma tarefa com mais digitos")
    .max(100, "Limite de caracteres ultrapassados")
    .optional()
    .or(z.literal("")),
});

export const toDoPatchSchema = z.object({
  title: z
    .string()
    .min(3, "Por favor, escreva uma tarefa com mais digitos")
    .max(100, "Limite de caracteres ultrapassados")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .min(6, "Por favor, escreva uma tarefa com mais digitos")
    .max(100, "Limite de caracteres ultrapassados")
    .optional()
    .or(z.literal("")),
});

export const LinksSchema = z.object({
  name: z
    .string()
    .min(3, "Por favor, escreva uma tarefa com mais digitos")
    .max(100, "Limite de caracteres ultrapassados"),
  link: z.string().min(3, "Por favor, escreva uma tarefa com mais digitos"),
});

export const ActivitieSchema = z.object({
  title: z
    .string()
    .min(3, "Por favor, escreva uma tarefa com mais digitos")
    .max(100, "Limite de caracteres ultrapassados"),
  content: z
    .string()
    .min(6, "Por favor, escreva uma tarefa com mais digitos")
    .max(100, "Limite de caracteres ultrapassados")
    .optional()
    .or(z.literal("")),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine(
      (data) => data.from > addDays(new Date(), -1),
      "End date must be in the future",
    ),
  links: z.array(LinksSchema).optional(),
});
