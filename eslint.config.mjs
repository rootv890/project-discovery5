import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import pluginQuery from '@tanstack/eslint-plugin-query'

const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

const compat = new FlatCompat( {
  baseDirectory: __dirname,
} )

const eslintConfig = [
  ...compat.config( {
    extends: [ "next/core-web-vitals", "next/typescript", "prettier" ]
  } ),
  ...pluginQuery.configs( 'flat/recommended' ),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]

export default eslintConfig
