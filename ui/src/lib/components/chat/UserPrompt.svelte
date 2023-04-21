<script>
	import UserPicture from '../UserPicture.svelte';
</script>

<div
	class="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800"
>
	<div
		class="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto"
	>
		<div class="w-[30px] flex flex-col relative items-end">
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
							src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2738%27%20height=%2738%27/%3e"
						/>
					</span>
					<UserPicture />
				</span>
			</div>
		</div>
		<div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
			<div class="flex flex-grow flex-col gap-3">
				<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
					<slot />
				</div>
			</div>
			<div class="flex justify-between lg:block" />
		</div>
	</div>
</div>
