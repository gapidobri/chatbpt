import { io } from 'socket.io-client';
import { userId } from './user';

export const socket = io('https://chat.gapi.me');

socket.on('connect', () => {
	console.log('Connected to socket server');

	userId.subscribe((id) => {
		if (!id) return;
		socket.emit('userId', id);
	});
});
