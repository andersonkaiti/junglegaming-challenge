import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_GATEWAY_URL: z.url(),
    VITE_API_WEBSOCKET_URL: z.url(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
