import z from 'zod'

export const envSchema = z.object({
  RABBIT_MQ_URI: z.string(),
  PORT: z.coerce.number(),
})

export type Env = z.infer<typeof envSchema>
