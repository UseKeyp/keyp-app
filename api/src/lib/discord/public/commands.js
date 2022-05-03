const { SlashCommandBuilder } = require('@discordjs/builders')

const credit = new SlashCommandBuilder()
  .setName('credit')
  .setDescription('Modify mint credits')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('increment')
      .setDescription('Add a single credit')
      .addUserOption((option) =>
        option.setName('target').setDescription('The user')
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('specify')
      .addUserOption((option) =>
        option
          .setName('amount')
          .setDescription('Set a specific amount of credits')
      )
  )

const block = new SlashCommandBuilder()
  .setName('block')
  .setDescription(`Prevent a member's games from being minted`)
// .addStringOption((option) => option.setName('username').setRequired(true))

const commands = [block]

module.exports = commands
