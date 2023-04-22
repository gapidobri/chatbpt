import { ChannelType, Client, GatewayIntentBits, Guild } from 'discord.js';
import { io, userChatMap } from './socket.js';
import moment from 'moment';

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

  guild = client.guilds.cache.get(process.env.GUILD_ID ?? '') ?? null;
});

client.on('messageCreate', (message) => {
  if (message.author.bot || message.guildId !== process.env.GUILD_ID) return;

  console.log('New discord message', message.content);

  const channel = message.channel;
  if (
    channel.type !== ChannelType.GuildText ||
    channel.parentId !== process.env.CATEGORY_ID
  )
    return;

  const userId = Object.keys(userChatMap).find((id) =>
    userChatMap[id].has(channel.id),
  );

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

  cleanupChannels();
  setInterval(cleanupChannels, 1000 * 60);
}

export function cleanupChannels() {
  const CATEGORY_ID = process.env.CATEGORY_ID;
  if (!CATEGORY_ID) return;

  guild?.channels.cache
    .filter(
      (c) => c.type === ChannelType.GuildText && c.parentId === CATEGORY_ID,
    )
    .forEach(async (c) => {
      if (!c.isTextBased()) return;
      const messages = await c.messages.fetch({ limit: 1 });
      const lastMessage = messages.last();
      if (!lastMessage) {
        await c.delete();
        return;
      }

      if (moment().diff(lastMessage.createdAt, 'minutes') >= 5) {
        await c.delete();
      }
    });
}
