import { prefix } from "./config.json"

import { CategoryChannel, Client, Collection, Guild, GuildMember, PermissionOverwrites, Role, TextChannel} from 'discord.js'
import { formatDiagnostic } from 'typescript';
const client: Client = new Client();

client.on('ready', () => {
    console.log(`Bot is ready.`);

});

client.on('message', async (msg) => {

    console.log(`Bot recive: [${msg.content}], from: [${msg.author}]` );

    if (msg.content.startsWith(`${prefix}dev`)){
        msg.channel.send('https://www.sagudeloo.com');
    }

    if (msg.content.startsWith(`${prefix}clear`) && msg.channel instanceof TextChannel){
        const fetchedMesseges = await msg.channel.messages.fetch({limit:100});
        msg.channel.bulkDelete(fetchedMesseges, true);
        console.log('Mensajes eliminados')
    }

    if (msg.content.startsWith(`${prefix}private-room`)){
        const { guild } = msg;
        if ( guild?.available ){
            const channels = await guild.channels.cache;
            let privateRoomParent: CategoryChannel | undefined;
            // Check if PRIVATE ROOMS category exist
            // And if exist then assing thant to privateRoomParent variable
            channels.forEach((channel, _) => {
                if (channel instanceof CategoryChannel && channel.name === 'PRIVATE ROOMS'){
                    privateRoomParent = channel;
                    console.log(`PRIVATE ROOMS category already exist with the id: [${privateRoomParent.id}] in the guild: [${guild.id}].`);
                }
            });
            // Create a PRIVATE ROOMS category if it didn't exist
            console.log(`Type: ${typeof privateRoomParent}, Value: ${privateRoomParent}`)
            if (typeof privateRoomParent === 'undefined'){
                privateRoomParent = await guild.channels.create('PRIVATE ROOMS', {
                    "type": 'category',
                    "permissionOverwrites": [{
                        id: guild.roles.everyone, 
                        deny: [
                            'VIEW_CHANNEL',
                            'CONNECT' ]
                    }]
                });
                console.log(`PRIVATE ROOMS category created with the id: [${privateRoomParent.id}] in the guild: [${guild.id}].`);
            }

            // let privateRoomMembers: Collection<string, GuildMember>|null = guild.member(msg.author);

            // if (msg?.mentions.members?.size){
            //     privateRoomMembers?.concat(msg?.mentions.members)
            // }
            // let privateRoomRole: Role = new Role({
            //     data: {
            //         name: "PR",
            //         members: []
            //     }
            // });
            // authorizations = [];
            // msg.mentions.users.forEach( (user, _) => {
            //     authorizations.push( new PermissionOverwrites()

            //     })
            // });
            let privateRoom: TextChannel =  await guild.channels.create('private room',{
                "type": 'text',
                "parent": privateRoomParent
            });
            console.log(`Private room channel created with the id: [${privateRoom.id}] in the category: [${privateRoomParent?.id}] and guild: [${guild.id}].`);
        }
    }
});

client.login(process.env.PRIVATE_ROOM_BOT_TOKEN);