const { SlashCommandBuilder } = require('@discordjs/builders')
import { logger } from 'src/lib/logger'
import {
  fetchMemberAndBlock,
  fetchMemberAndUpdateBan,
  fetchMemberAndGiveCredits,
} from 'src/lib/members'

const commands = [
  {
    data: new SlashCommandBuilder()
      .setName('block')
      .setDescription(`Prevent a member's games from being minted`)
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription('Who to block')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const username = interaction.options.getString('username')
      const member = await fetchMemberAndBlock(username, true)
      // fetchMemberAndBlock doesn't throw errors, so we must do it manually
      if (!member) throw 'Member not found'
      interaction.editReply(`${username} is now blocked`)
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription(`Update a member's banned status`)
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription('Who to ban')
          .setRequired(true)
      )
      .addBooleanOption((option) =>
        option
          .setName('banned')
          .setDescription('"True" to ban, "False" to remove a ban')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const username = interaction.options.getString('username')
      const isBanned = interaction.options.getBoolean('banned')
      const member = await fetchMemberAndUpdateBan(username, isBanned)
      // fetchMemberAndBlock doesn't throw errors, so we must do it manually
      if (!member) throw 'Member not found'
      if (isBanned) return interaction.editReply(`${username} is now banned`)
      interaction.editReply(`${username} is no longer banned`)
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('credit')
      .setDescription('Increase mint credits')
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription('Who to credit')
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName('int')
          .setDescription('How many credits')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const username = interaction.options.getString('username')
      const creditsToGive = interaction.options.getInteger('int')
      const member = await fetchMemberAndGiveCredits(username, creditsToGive)
      if (!member) throw 'Member not found'
      interaction.editReply(
        `${username} got +${creditsToGive} mint credits, for a total of ${member.mintCredits}`
      )
    },
  },
]

export default commands
