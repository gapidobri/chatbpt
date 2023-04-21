import { Client, GatewayIntentBits, Guild, TextChannel } from 'discord.js';
import { io } from './socket.js';

const GUILD_ID = '1098950715268943872';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

export let guild: Guild | null = null;

client.on('ready', () => {
  console.log('Discord bot ready');

  guild = client.guilds.cache.get(GUILD_ID) ?? null;
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.guildId !== GUILD_ID) return;

  console.log('New discord message', message.content);

  const channel = message.channel;
  if (!channel.isTextBased()) return;

  const userId = (channel as TextChannel).parent?.name;

  const data = {
    chatId: message.channelId,
    messageId: message.id,
    content: message.content,
  };

  if (userId) {
    io.to(userId).emit('message', data);
  } else {
    io.emit('message', data);
  }
});

export function setupDiscordBot() {
  client.login(process.env.DISCORD_BOT_TOKEN);
}
