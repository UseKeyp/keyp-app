const { SlashCommandBuilder } = require('@discordjs/builders')
import DiscordBot from 'src/lib/discord/discord'
import commands from './commands'

const bot = new DiscordBot({
  clientId: process.env.DISCORD_PUBLIC_CLIENT_ID,
  token: process.env.DISCORD_PUBLIC_BOT_TOKEN,
  commands,
})
