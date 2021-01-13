const { Client, MessageEmbed, Message} = require('discord.js');
const client = new Client();

console.log("Hello World!!")

client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}!`);
});

client.on('message', async msg => {
    console.log(msg.content)
    if ( msg.content === 'ping'){
        msg.reply('Pong!');
    }
    if (msg.content === '!test'){+
        msg.delete()
        msg.channel.send('glad your are testing');
    }
    if (msg.content === '!dev'){
        msg.channel.send('https://www.sagudeloo.com');
    }
    if (msg.content === 'Hermana' || msg.content === 'hermana'){
        msg.channel.send('Hola Salomé');
    }
    if (msg.content === '!pretty'){
        const embed = new MessageEmbed()
            .setTitle('A pretty messege')
            .setColor('RED')
            .setAuthor('Stiven Agudelo', 'https://cdn.awsli.com.br/31/31979/arquivos/gato-quem-somos.png')
            // .addField('Something One', 'Lorem Impusun')
            // .addField('Something One', 'Lorem Impusun')
            // .addField('Something One', 'Lorem Impusun')
            // .addField('Something One', 'Lorem Impusun');
        msg.channel.send(embed);
    }
    if (msg.content === '!clear'){
        const fetched = await msg.channel.messages.fetch({limit:100});
        msg.channel.bulkDelete(fetched)
        console.log('Mensajes eliminados')
    }
});

client.login('Nzk4NzU5OTU4MzM3MjkwMjQw.X_5tLg.xXvTZPVz4ra0sdx7_jbWQS6MhPw');