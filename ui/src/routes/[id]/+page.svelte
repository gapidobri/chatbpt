<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { chats, type Message, sendMessage } from '$lib/chat';
	import InputField from '$lib/components/InputField.svelte';
	import BotResponse from '$lib/components/chat/BotResponse.svelte';
	import UserPrompt from '$lib/components/chat/UserPrompt.svelte';
	import { socket } from '$lib/socket';
	import type { PageData } from './$types';

	export let data: PageData;

	let messages: Message[];

	$: chats.subscribe((chats) => {
		const chat = chats.find((chat) => chat.id === data.id);
		if (!chat) {
			return goto('/');
		}
		messages = chat.messages ?? [];
	});

	function handleSubmit(e: CustomEvent<string>) {
		socket.emit('message', e.detail);
		sendMessage(data.id, e.detail);
	}
</script>

<div class="flex-1 overflow-hidden">
	<div class="h-full dark:bg-gray-800 overflow-y-auto">
		<div class="flex flex-col items-center text-sm dark:bg-gray-800">
			{#each messages as message}
				{#if message.type === 'user'}
					<UserPrompt>{message.content}</UserPrompt>
				{:else}
					<BotResponse chatId={data.id} {message} />
				{/if}
			{/each}
			<div class="w-full h-32 md:h-48 flex-shrink-0" />
		</div>
	</div>
</div>
<InputField on:submit={handleSubmit} />
