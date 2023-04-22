<script lang="ts">
	import { createChat } from '$lib/chat';
	import InputField from '$lib/components/InputField.svelte';
	import LandingPage from '$lib/components/LandingPage.svelte';

	function handleNewChat(e: CustomEvent<string>) {
		const message = e.detail;
		console.log('new chat', message);
		createChat(message);
	}
</script>

<div class="flex-1 overflow-hidden">
	<div class="h-full dark:bg-gray-800">
		<div class="flex flex-col items-center text-sm dark:bg-gray-800">
			<LandingPage />
			<div class="w-full h-32 md:h-48 flex-shrink-0" />
		</div>
	</div>
</div>
<InputField on:submit={handleNewChat} />
