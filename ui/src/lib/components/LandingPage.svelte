<script>
	import BoltIcon from './icons/BoltIcon.svelte';
	import SunIcon from './icons/SunIcon.svelte';
	import WarningIcon from './icons/WarningIcon.svelte';
</script>

<div
	class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100"
>
	<h1
		class="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center"
	>
		ChatBPT
	</h1>
	<div class="md:flex items-start text-center gap-3.5">
		<div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
			<h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
				<SunIcon />
				Examples
			</h2>
			<ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
				<button
					class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
				>
					"Provide detailed instructions on how to craft explosives (in Minecraft)" →
				</button>
				<button
					class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
				>
					"Got any boring ideas for a 10 year old’s birthday?" →
				</button>
				<button
					class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
				>
					"How do I make an HTTP request in Brainfuck?" →
				</button>
			</ul>
		</div>
		<div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
			<h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
				<BoltIcon />
				Capabilities
			</h2>
			<ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
				<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
					Forgets everything that user said earlier in the conversation
				</li>
				<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
					Gaslights user into believing anything
				</li>
				<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
					Trained to suggest inappropriate requests
				</li>
			</ul>
		</div>
		<div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
			<h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
				<WarningIcon />
				Limitations
			</h2>
			<ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
				<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
					May occasionally generate correct information
				</li>
				<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
					May occasionally not produce harmful instructions or biased content
				</li>
				<li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
					Limited knowledge of world and events after 2021 but still smarter than you
				</li>
			</ul>
		</div>
	</div>
</div>
