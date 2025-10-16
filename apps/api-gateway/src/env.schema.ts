import z from 'zod'

export const envSchema = z.object({
  RABBIT_MQ_URI: z.string(),
})

export type Env = z.infer<typeof envSchema>
