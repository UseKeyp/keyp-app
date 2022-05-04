// Run with this command: $(node tasks/environment/setupEnv) && yarn rw exec --prisma=false discord

const { Routes } = require('discord-api-types/v9')
const { REST } = require('@discordjs/rest')

import adminCommands from '../api/src/lib/discord/admin/commands'
import {
  botToken as adminBotToken,
  clientId as adminClientId,
} from '../api/src/lib/discord/admin/config'

import publicCommands from '../api/src/lib/discord/public/commands'
import {
  botToken as publicBotToken,
  clientId as publicClientId,
} from '../api/src/lib/discord/public/config'

const dotenv = require('dotenv')
dotenv.config()

const BOT = 'ADMIN'
// const BOT= "PUBLIC"

const GUILD_ID = '874700997220515901' // Our internal treasure-chess server

const method = 'PUT'
// "PUT" for commands are always treated as an upsert
// To remove old unwanted command See https://discord.com/developers/docs/interactions/application-commands#updating-and-deleting-a-command

let botName = `chester ${process.env.ENVIRONMENT}`
let botToken = adminBotToken
let clientId = adminClientId
let commands = adminCommands

if (BOT === 'PUBLIC') {
  botName = `treasure-chess ${process.env.ENVIRONMENT}`
  botToken = publicBotToken
  let clientId = publicClientId
  commands = publicCommands
}

const registerCommands = async () => {
  try {
    console.log(
      `Registering commands for bot "${botName}" ${clientId}- ${commands.map(
        (cmd) => cmd.data.name
      )}`
    )
    const rest = new REST({ version: '9' }).setToken(botToken)
    await Promise.all(
      [
        // Global commands takes up to 1 hour to propagate
        Routes.applicationCommands(clientId),
        // Guild-specific commands update instantly
        Routes.applicationGuildCommands(clientId, GUILD_ID),
      ].map(async (path) => {
        await rest.put(path, {
          body: commands.map((cmd) => cmd.data),
        })
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export default registerCommands
