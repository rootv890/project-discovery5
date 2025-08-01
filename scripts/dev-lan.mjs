// scripts/dev-lan.mjs
import { execaCommand } from "execa"
import fs from "fs"

const getLocalIP = async () => {
  try {
    const { stdout } = await execaCommand( "ipconfig getifaddr en0" ) // macOS only
    return stdout.trim()
  } catch {
    console.error( "❌ Couldn't get IP. Are you on macOS?" )
    process.exit( 1 )
  }
}

const updateNextConfig = ( ip ) => {
  const configPath = "./next.config.ts"
  let content = fs.readFileSync( configPath, "utf-8" )

  const newLine = `allowedDevOrigins: ['http://${ ip }:3000'],`

  // Remove existing allowedDevOrigins
  const cleanedContent = content.replace(
    /allowedDevOrigins\s*:\s*\[[^\]]*\],?\s*/g,
    ""
  )

  // Insert new allowedDevOrigins inside nextConfig object
  const updated = cleanedContent.replace(
    /(const\s+nextConfig\s*:\s*NextConfig\s*=\s*{)/,
    `$1\n  ${ newLine }`
  )

  fs.writeFileSync( configPath, updated, "utf-8" )
  console.log( `✅ Updated next.config.ts with allowedDevOrigins for ${ ip }` )
}

const runDevServer = async () => {
  await execaCommand( "next dev -H 0.0.0.0", { stdio: "inherit" } )
}

const main = async () => {
  const ip = await getLocalIP()
  updateNextConfig( ip )
  await runDevServer()
}

main()
