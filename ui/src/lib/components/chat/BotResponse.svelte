<script lang="ts">
	import ChatGPTIcon from '../icons/ChatGPTIcon.svelte';
	import DislikeIcon from '../icons/DislikeIcon.svelte';
	import LikeIcon from '../icons/LikeIcon.svelte';
	import ClipboardIcon from '../icons/ClipboardIcon.svelte';
	import { dislikeMessage, likeMessage, type Message } from '$lib/chat';

	export let chatId: string;
	export let message: Message;

	function handleLike() {
		likeMessage(chatId, message);
	}

	function handleDislike() {
		dislikeMessage(chatId, message);
	}
</script>

<div
	class="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]"
>
	<div
		class="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto"
	>
		<div class="w-[30px] flex flex-col relative items-end">
			<ChatGPTIcon />
		</div>
		<div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
			<div class="flex flex-grow flex-col gap-3">
				<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
					<div class="markdown prose w-full break-words dark:prose-invert dark">
						<p>{message.content}</p>
					</div>
				</div>
			</div>
			<div class="flex justify-between lg:block">
				<div
					class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible"
				>
					<button
						class="flex ml-auto gap-2 h-full w-full rounded-md p-1 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"
					>
						<ClipboardIcon />
					</button>
					{#if message.rating !== 'dislike'}
						<button
							on:click={handleLike}
							class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"
						>
							<LikeIcon />
						</button>
					{/if}
					{#if message.rating !== 'like'}
						<button
							on:click={handleDislike}
							class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"
						>
							<DislikeIcon />
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
