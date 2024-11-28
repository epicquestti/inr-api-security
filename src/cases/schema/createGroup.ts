import { z } from "zod"
export const createGroupValidation = z.object({
  name: z
    .string()
    .min(2, { message: "nome de conter ao menos 2 caracteres." })
    .max(100, { message: "nome deve conter até 100 caracteres." }),
  canonical: z
    .string()
    .min(2, { message: "nome canónico de conter ao menos 2 caracteres." })
    .max(100, { message: "nome canónico deve conter até 100 caracteres." }),
  color: z
    .string()
    .max(7, { message: "cor deve conter até 7 caracteres." })
    .optional(),
  active: z.boolean(),
  super: z.boolean(),
  features: z
    .array(
      z.object({
        id: z.number(),
        free: z.boolean()
      })
    )
    .min(1, { message: "Selecione ao menos um recurso" }),
  createdById: z.number()
})

export type createGroupControllerProps = z.input<typeof createGroupValidation>
export type createGroupServiceProps = z.output<typeof createGroupValidation>
