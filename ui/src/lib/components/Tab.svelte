<script lang="ts">
	import { page } from '$app/stores';
	import { deleteChat, type Chat } from '$lib/chat';
	import ChatIcon from './icons/ChatIcon.svelte';
	import DeleteIcon from './icons/DeleteIcon.svelte';
	import RenameIcon from './icons/RenameIcon.svelte';

	export let chat: Chat;

	let selected = false;
	$: selected = $page.url.pathname === `/${chat.id}`;

	function handleDelete() {
		deleteChat(chat.id);
	}
</script>

<a
	href="/{chat.id}"
	class={selected
		? 'flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-gray-800 hover:bg-gray-800 group'
		: 'flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group'}
>
	<ChatIcon />
	<div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
		{chat.name}
		{#if selected}
			<div class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800" />
		{/if}
	</div>

	{#if selected}
		<div class="absolute flex right-1 z-10 text-gray-300 visible">
			<button class="p-1 hover:text-white">
				<RenameIcon />
			</button>
			<button on:click={handleDelete} class="p-1 hover:text-white">
				<DeleteIcon />
			</button>
		</div>
	{/if}
</a>
