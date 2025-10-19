import z from 'zod'

export const envSchema = z.object({
  RABBIT_MQ_URI: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  PORT: z.coerce.number(),
})

export type Env = z.infer<typeof envSchema>
