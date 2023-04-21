import { io } from 'socket.io-client';
import { userId } from './user';
import { syncChats } from './chat';

// export const socket = io('http://localhost:3000');
export const socket = io('https://chat.gapi.me');

socket.on('connect', () => {
	console.log('Connected to socket server');

	userId.subscribe((id) => {
		socket.emit('userId', id, (chatIds: string[]) => {
			syncChats(chatIds);
		});
	});
});
