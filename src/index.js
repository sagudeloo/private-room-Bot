const { Client, MessageEmbed} = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}.`);

});

client.on('debug', console.log)

client.on('message', async msg => {
    console.log(`Bot recive: [${msg.content}], from: [${msg.author}]` )
    if (msg.content === '!dev'){
        msg.channel.send('https://www.sagudeloo.com');
    }
    if (msg.content === '!clear'){
        const fetchedMesseges = await msg.channel.messages.fetch({limit:100});
        msg.channel.bulkDelete(fetchedMesseges)
        console.log('Mensajes eliminados')
    }
    if (msg.content === '!private-room'){
        if ( msg.guild.available ){
            const channels = await msg.guild.channels.cache;
            privateRoomParent = null;
            // Check if PRIVATE ROOMS category exist
            // And if exist then assing thant to privateRoomParent variable
            channels.forEach((channel, _) => {
                if (channel.type === 'category' && channel.name === 'PRIVATE ROOMS'){
                    privateRoomParent = channel;
                    console.log("Eureca tenemos un PRIVATE ROOMS")
                }
            });
            // Create a PRIVATE ROOMS category if it didn't exist
            if (!privateRoomParent){
                privateRoomParent = await msg.guild.channels.create('PRIVATE ROOMS', {
                    "type": 'category'
                });
            }
            await msg.guild.channels.create('private room',{
                "type": 'text',
                "parent": privateRoomParent
            });
        }
    }
});

client.login(process.env.PRIVATE_ROOM_BOT_TOKEN);