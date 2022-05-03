import { Client, Intents } from 'discord.js'
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
import { logger } from 'src/lib/logger'

const DISCORD_NO_DM_INVOCATION =
  'NOTE: Treasure Chess will never DM you! You can only use the bot in the server.'
const DISCORD_INVALID_PERMISSIONS = `⛈️ Sorry, I'm powerless. Someone must have revoked my permission to manage roles.`
const DISCORD_SERVER_ERROR = `⛈️ Sorry, something went terribly wrong with my circuits. If this keeps happening please contact us: https://discord.gg/rbx9AKAaPS`

class DiscordBot {
  constructor({ clientId, token, commands }) {
    if (!token || !clientId || !commands)
      throw 'Invalid Discord params provided'

    this.clientId = clientId
    this.token = token
    this.commands = commands
    try {
      const client = new Client({ intents: [] })
      client.once('ready', async () => {
        logger.debug(`Discord bot ready! ${clientId}`)
      })

      client.on('message', async (message) => {
        if (message.channel.type == 'dm')
          return message.reply(DISCORD_NO_DM_INVOCATION)
      })

      client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return
        if (interaction.channel.type == 'dm')
          return interaction.reply(DISCORD_NO_DM_INVOCATION)

        const command = commands.find(
          (cmd) => cmd.data.name === interaction.commandName
        )

        if (!command) return

        try {
          // Extend response deadline from 3s to 15m
          await interaction.deferReply({ ephemeral: true })
          await command.execute(interaction)
        } catch (e) {
          logger.error(e)
          await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          })
        }
      })

      client.login(token)
      this.client = client
    } catch (e) {
      logger.error(e)
      // Maybe we don't want to throw here if there are multiple instances.
    }
  }
  async init() {
    const rest = new REST({ version: '9' }).setToken(this.token)
    await rest.put(Routes.applicationCommands(this.clientId), {
      body: this.commands,
    })
  }
}

export default DiscordBot
