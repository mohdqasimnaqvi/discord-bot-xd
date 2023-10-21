const { ActionRowBuilder, ButtonStyle, ButtonBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const confirm = new ButtonBuilder()
		// .setCustomId('confirm')
		.setLabel('Not Suspocious At All.')
		.setURL('https://discord.com/vanityurl/dotcom/steakpants/flour/flower/index11.html')
		.setStyle(ButtonStyle.Link);
		
		const row = new ActionRowBuilder()
		.addComponents(confirm);
		
		if (user) return interaction.reply({content: `${user.username}'s avatar: ${user.displayAvatarURL()}`, components: [row]});
		return interaction.reply({content: `Your avatar: ${interaction.user.displayAvatarURL()}`, components: [row]});
	},
};
