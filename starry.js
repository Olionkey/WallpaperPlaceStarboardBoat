modules.exports = class {
    constructor(client) {
        this.client = client;
    }

    // Action happens here.
    async run (reaction, user) {
        const message = reaction.message;
        // Checks if the reaction is not the unicode star emote.
        if (reaction.emoji.name !== '⭐') return;
        // Checks to see if the person who reacted is OP
        if (message.author.id === user.id || message.author.bot) return;

        const { starboardChannel } = "./info/config.json".channelName;

        const starChannel = message.guild.channel.find(channel => channel.name == starboardChannel)
        if (!starChannel ) return console.log ("uwu i made fucky");
        
        const fetchedMessages = await starChannel.fetchMessages({ limit: 100})
    }
}