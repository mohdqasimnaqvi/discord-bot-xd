const { AttachmentBuilder,ComponentType,ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, SlashCommandBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Makes a Poll!')
		.addStringOption(option => option.setName('pollname').setDescription('The poll\'s content').setRequired(false))
		.addStringOption(option => option.setName('polloption1').setDescription('The poll\'s first option').setRequired(false))
		.addStringOption(option => option.setName('polloption2').setDescription('The poll\'s second option').setRequired(false)),
	async execute(interaction) {
		const pollName = interaction.options.get('pollname').value;
		const option1Value = interaction.options.get('polloption1').value;
		const option2Value = interaction.options.get('polloption2').value;
		console.log(pollName)
		let optionsAndTheirCount = {
			option1: 0,
			option2: 0
		}
		const select = new StringSelectMenuBuilder()
		.setCustomId('starter')
		.setPlaceholder('Make a selection!')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel(option1Value)
				.setValue(option1Value),
			new StringSelectMenuOptionBuilder()
				.setLabel(option2Value)
				.setValue(option2Value),
		);
		const row = new ActionRowBuilder()
			.addComponents(select);
	

		let response = await interaction.reply({content: blockQuote(`${bold(`Poll by ${interaction.user.username}`)}
${pollName}`), components: [row]});
		
		
const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

collector.on('collect', async i => {
	const selection = i.values[0];
	if (selection === option1Value) optionsAndTheirCount.option1++
	if (selection === option2Value) optionsAndTheirCount.option2++
	let URLtoImage = `https://quickchart.io/chart?v=2.9.4&c={type:'doughnut',data:{labels:['${option1Value}','${option2Value}'],datasets:[{data:[${optionsAndTheirCount.option1},${optionsAndTheirCount.option2}]}],},options:{plugins:{doughnutlabel:{labels:[{text:'${optionsAndTheirCount.option1 + optionsAndTheirCount.option2}',font: { size: 20 } }, { text: 'total' }],},},},}`
	console.log(URLtoImage)
	const canvas = Canvas.createCanvas(793 / 2, 475 / 2);
	const context = canvas.getContext('2d');
	// const attachment = new AttachmentBuilder()
	const background = await Canvas.loadImage(URLtoImage);
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

	interaction.editReply({content: blockQuote(`${bold(`Poll by ${interaction.user.username}`)}
	${pollName}
	${option1Value}: ${optionsAndTheirCount.option1}
	${option2Value}: ${optionsAndTheirCount.option2}`), files: [attachment]})
	// await i.reply(`${i.user} has selected ${selection}!`);
});
		// }


	},
};
