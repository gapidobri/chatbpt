<script lang="ts">
	import '../app.postcss';

	import NewChatButton from '$lib/components/NewChatButton.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import MenuIcon from '$lib/components/icons/MenuIcon.svelte';
	import UserPicture from '$lib/components/UserPicture.svelte';
	import { chats } from '$lib/chat';
	import { userId } from '$lib/user';
</script>

<div class="h-screen">
	<div class="overflow-hidden w-full h-full relative flex">
		<div class="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
			<div class="flex h-full min-h-0 flex-col ">
				<div class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
					<nav class="flex h-full flex-1 flex-col p-2">
						<NewChatButton />
						<div class="flex-col flex-1 overflow-y-auto">
							<div class="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
								{#each $chats as chat}
									<Tab {chat} />
								{/each}
							</div>
						</div>
						<div class="border-t border-white/20 pt-2">
							<div class="relative" data-headlessui-state="">
								<button
									class="flex w-full items-center gap-2.5 rounded-md py-3 px-3 text-sm transition-colors duration-200 hover:bg-gray-800 ui-open:bg-gray-800"
									id="headlessui-menu-button-:Rdlhd6:"
									type="button"
									aria-haspopup="true"
									aria-expanded="false"
									data-headlessui-state=""
								>
									<div class="-ml-0.5">
										<div class="relative flex">
											<span
												style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px none; margin: 0px; padding: 0px; position: relative; max-width: 100%;"
											>
												<span
													style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px none; margin: 0px; padding: 0px; max-width: 100%;"
												>
													<img
														style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px none; margin: 0px; padding: 0px;"
														alt=""
														aria-hidden="true"
														src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e"
													/>
												</span>
												<UserPicture />
											</span>
										</div>
									</div>
									<div class="grow text-left text-white">{$userId ?? ''}</div>
									<MenuIcon />
								</button>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
		<div class="flex h-full max-w-full flex-1 flex-col">
			<main
				class="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1"
			>
				<slot />
			</main>
		</div>
	</div>
</div>
