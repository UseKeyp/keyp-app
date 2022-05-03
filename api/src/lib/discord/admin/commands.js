const { SlashCommandBuilder } = require('@discordjs/builders')
import { logger } from 'src/lib/logger'

const block = {
  data: new SlashCommandBuilder()
    .setName('block')
    .setDescription(`Prevent a member's games from being minted`)
    .addUserOption((option) => option.setName('username')),
  execute: async (interaction) => {
    logger.debug({ custom: interaction }, 'Discord interaction')
  },
}

const commands = [block]

module.exports = commands
