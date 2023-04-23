import { io } from 'socket.io-client';
import { userId } from './user';
import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

export const socket = io(env.PUBLIC_SOCKET_URL, { autoConnect: false });

if (browser) {
	socket.connect();
}

socket.on('connect', () => {
	console.log('Connected to socket server');

	userId.subscribe((id) => {
		if (!id) return;
		socket.emit('userId', id);
	});
});
