// to make the env file typesafe and easy to debug in deployment and all just a simple wrapper around the env file

import { z } from "zod";

const envSchema = z.object({
  // Add all the env variables here
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string().url(),
})


const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;

// global declare module to make the env variables available in the process.env object
declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export default env;

// This file will give two ways to access the env variables
// 1. well typed and vscode suggestions for process.env.<SOMETHING>
// 2. env object with types eg: env.DATABASE_URL
// Note: use whatever but process.env is always available in STRING format