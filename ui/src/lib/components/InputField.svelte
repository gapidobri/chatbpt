<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SendIcon from './icons/SendIcon.svelte';

	const dispatch = createEventDispatcher();

	let text: string = '';
	let height = 24;

	$: height = text.split('\n').length * 24;

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			submit();
		}
	}

	function submit() {
		dispatch('submit', text);
		text = '';
	}
</script>

<div
	class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2"
>
	<form
		class="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
	>
		<div class="relative flex h-full flex-1 items-stretch md:flex-col">
			<div class="">
				<div class="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center" />
			</div>
			<div
				class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
			>
				<textarea
					bind:value={text}
					on:keypress={handleKeyPress}
					tabindex="0"
					data-id="root"
					style="max-height: 200px; height: {height}px; overflow-y: hidden; outline: none"
					rows="1"
					placeholder="Send a message..."
					class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
				/>
				<button
					on:click={submit}
					disabled={text.length === 0}
					class="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40"
				>
					<SendIcon />
				</button>
			</div>
		</div>
	</form>
	<div
		class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6"
	>
		<span>
			<a href="https://discord.gg/uCKj9yDs" target="_blank" rel="noreferrer" class="underline">
				ChatBPT Mar 23 Version
			</a>. Paid Misinvestigation Preview. ChatBPT may produce accurate information about people,
			places, or facts.
		</span>
	</div>
</div>
