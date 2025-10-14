import { z } from 'zod'

export const envSchema = z.object({
  RABBIT_MQ_URI: z.string().default('amqp://admin:admin@localhost:5672'),
  RABBIT_MQ_AUTH_QUEUE: z.string(),
  RABBIT_MQ_TASKS_QUEUE: z.string(),
  RABBIT_MQ_NOTIFICATIONS_QUEUE: z.string(),
})

export type Env = z.infer<typeof envSchema>
