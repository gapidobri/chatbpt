import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const userId = readable<string | null>(null, (set) => {
	if (!browser) return;

	let userId = localStorage.getItem('userId');

	if (!userId) {
		userId =
			Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		localStorage.setItem('userId', userId);
	}

	set(userId);
});
