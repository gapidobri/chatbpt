import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { socket } from './socket';
import { goto } from '$app/navigation';

export type Message = {
	type: 'bot' | 'user';
	content: string;
	id?: string;
	rating?: 'like' | 'dislike';
};

export type Chat = {
	id: string;
	name: string;
	messages: Message[];
};

function saveChats(chats: Chat[]) {
	if (!browser) return;
	localStorage.setItem('chats', JSON.stringify(chats));
}

function getChats() {
	if (!browser) return [];
	const chats = localStorage.getItem('chats');
	return chats ? JSON.parse(chats) : [];
}

export const chats = writable<Chat[]>(getChats());
chats.subscribe(saveChats);

export function createChat(content: string) {
	socket.emit('create', content, (id: string) => {
		chats.update((chats) => {
			const message: Message = { type: 'user', content };
			chats.push({ id, name: content, messages: [message] });
			return chats;
		});
		goto(`/${id}`);
	});
}

export function deleteChat(id: string) {
	chats.update((chats) => chats.filter((chat) => chat.id !== id));
	goto('/');
}

export function sendMessage(chatId: string, content: string) {
	socket.emit('message', { chatId, content }, (newChatId: string) => {
		chats.update((chats) => {
			const chat = chats.find((chat) => chat.id === chatId);
			if (chat) {
				if (newChatId !== chatId) chat.id = newChatId;
				chat.messages.push({ type: 'user', content });
			}
			return chats;
		});
		if (newChatId !== chatId) {
			goto(`/${newChatId}`);
		}
	});
}

export function likeMessage(chatId: string, message: Message) {
	socket.emit('like', { ...message, chatId }, () => {
		chats.update((chats) => {
			const chat = chats.find((chat) => chat.id === chatId);
			if (chat) {
				const msg = chat.messages.find((msg) => msg.id === message.id);
				if (msg) msg.rating = 'like';
			}
			return chats;
		});
	});
}

export function dislikeMessage(chatId: string, message: Message) {
	socket.emit('dislike', { ...message, chatId }, () => {
		chats.update((chats) => {
			const chat = chats.find((chat) => chat.id === chatId);
			if (chat) {
				const msg = chat.messages.find((msg) => msg.id === message.id);
				if (msg) msg.rating = 'dislike';
			}
			return chats;
		});
	});
}

type SocketMessage = {
	chatId: string;
	content: string;
	messageId: string;
};

socket.on('message', (data: SocketMessage) => {
	chats.update((chats) => {
		const chat = chats.find((chat) => chat.id === data.chatId);
		if (chat)
			chat.messages.push({
				type: 'bot',
				content: data.content,
				id: data.messageId
			});
		return chats;
	});
});
