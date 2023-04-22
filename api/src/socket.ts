import { createServer } from 'http';
import { Server } from 'socket.io';
import { client, guild } from './discord';
import { ChannelType } from 'discord.js';

const bannedUsers = ['8c5asbryd8gqrmjojqkg9i'];
export const userChatMap: Record<string, Set<string>> = {};

const httpServer = createServer();
export const io = new Server(httpServer);

io.on('connection', (socket) => {
  let userId: string | null = null;
  console.log('New connection');

  socket.on('userId', (id: string) => {
    if (bannedUsers.includes(id)) {
      socket.disconnect();
      return;
    }

    console.log('New user', id);
    socket.join(id);
    userId = id;

    if (!userChatMap[userId]) {
      userChatMap[userId] = new Set();
    }
  });

  socket.on(
    'message',
    async ({ chatId, content }, callback: (chatId: string) => void) => {
      if (!content) return;
      console.log('New message', content, chatId);

      let channel = client.channels.cache.get(chatId);
      if (!channel) {
        const name = content.trim().toLowerCase().replaceAll(' ', '-');

        channel = await guild?.channels.create({
          name,
          type: ChannelType.GuildText,
        });

        await channel?.setParent(process.env.CATEGORY_ID ?? '');
      }
      if (!channel || !channel.isTextBased()) return;

      if (userId) {
        userChatMap[userId].add(channel.id);
      }

      if (content === '') {
        content = 'Empty message';
      }

      channel.send(content);
      if (callback) {
        callback(channel.id);
      }
    },
  );

  socket.on(
    'create',
    async (message: string, callback: (id: string) => void) => {
      if (!userId) return;
      console.log('New chat created', message);
      if (message === '') message = 'Untitled';

      const name = message.trim().toLowerCase().replaceAll(' ', '-');

      const channel = await guild?.channels.create({
        name,
        type: ChannelType.GuildText,
      });
      if (!channel) return;

      await channel.setParent(process.env.CATEGORY_ID ?? '');
      await channel.send(message);
      if (callback) {
        callback(channel.id);
      }
    },
  );

  socket.on('like', async (message, callback: () => void) => {
    console.log('New like', message.id);
    if (!message.id) return;

    const channel = guild?.channels.cache.get(message.chatId);
    if (!channel || !channel.isTextBased()) return;

    const discMsg = await channel.messages.fetch(message.id);
    if (!discMsg) return;

    await discMsg.react('👍');
    callback();
  });

  socket.on('dislike', async (message, callback: () => void) => {
    console.log('New dislike', message.id);
    if (!message.id) return;

    const channel = guild?.channels.cache.get(message.chatId);
    if (!channel || !channel.isTextBased()) return;

    const discMsg = await channel.messages.fetch(message.id);
    if (!discMsg) return;

    await discMsg.react('👎');
    callback();
  });

  socket.on('disconnect', (e) => {
    console.log('User disconnected', userId);
  });
});

export function setupSocket() {
  httpServer.listen(3000, () => console.log('Listening on port 3000'));
}
