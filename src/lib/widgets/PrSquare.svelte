<div class="flex flex-row">
	<div class="max-w-300px">
		<slot name="image" />
	</div>
	<div class="flex flex-col p-l-4">
		<div class="font-size-8">
			<slot name="title" />
		</div>
		<div class="max-w-300px p-t-4">
			<slot name="content" />
		</div>
	</div>
</div>
