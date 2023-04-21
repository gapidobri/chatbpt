import { createServer } from 'http';
import { Server } from 'socket.io';
import { client, guild } from './discord';
import { ChannelType } from 'discord.js';

const httpServer = createServer();
export const io = new Server(httpServer);

io.on('connection', (socket) => {
  let userId: string | null = null;
  console.log('New connection');

  socket.on(
    'userId',
    (id: string, callback: (channelIds: string[]) => void) => {
      console.log('New user', id);
      socket.join(id);
      userId = id;

      if (callback) {
        const channels = guild?.channels.cache
          .filter((c) => c.parent?.name === id)
          .map((c) => c.id);

        if (channels) {
          callback(channels);
        }
      }
    },
  );

  socket.on('message', ({ chatId, content }) => {
    console.log('New message', content, chatId);

    const channel = client.channels.cache.get(chatId);
    if (!channel || !channel.isTextBased()) return;

    if (content === '') {
      content = 'Empty message';
    }

    channel.send(content);
  });

  socket.on(
    'create',
    async (message: string, callback: (id: string) => void) => {
      if (!userId) return;
      console.log('New tab created', message);
      if (message === '') message = 'Untitled';

      const name = message.trim().toLowerCase().replaceAll(' ', '-');

      let category = guild?.channels.cache.find((c) => c.name === userId);
      if (!category) {
        category = await guild?.channels.create({
          type: ChannelType.GuildCategory,
          name: userId,
        });
        if (!category) return;
      }

      const channel = await guild?.channels.create({
        name,
        type: ChannelType.GuildText,
      });
      if (!channel) return;

      await channel.setParent(category.id);
      await channel.send(message);
      callback(channel.id);
    },
  );

  socket.on('delete', async (id: string, callback: () => void) => {
    guild?.channels.cache.get(id)?.delete();
    callback();
  });

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

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

export function setupSocket() {
  httpServer.listen(3000, () => console.log('Listening on port 3000'));
}
