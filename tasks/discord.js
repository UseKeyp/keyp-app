// Run with this command: $(node tasks/environment/setupEnv) && node tasks/discord.js

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const adminCommands = require('../api/src/lib/discord/admin/commands')
const publicCommands = require('../api/src/lib/discord/public/commands')

const dotenv = require('dotenv')
dotenv.config()

const BOT = 'ADMIN'
// const BOT= "PUBLIC"

let token = process.env.DISCORD_ADMIN_BOT_TOKEN
let clientId = process.env.DISCORD_ADMIN_CLIENT_ID
let commands = adminCommands

if (BOT === 'PUBLIC') {
  token = process.env.DISCORD_PUBLIC_BOT_TOKEN
  clientId = process.env.DISCORD_PUBLIC_CLIENT_ID
  commands = publicCommands
}

const registerCommands = async () => {
  try {
    console.log(`Commands: ${commands.map((cmd) => cmd.data.name)}`)
    const rest = new REST({ version: '9' }).setToken(token)
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands.map((cmd) => cmd.data),
    })
  } catch (e) {
    console.error(e)
  }
}

registerCommands()
