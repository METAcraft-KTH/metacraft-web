<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import Seo from '$lib/Seo.svelte';
	import PageDescription from '$lib/layout/standard/PageDescription.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
</script>

<Seo title={m.rules_title()} />


<!-- !! CUSTOM BG !! -->
<style>
	.custombg {
		background-image: linear-gradient(
        #724b4f80, 
        #724b4f80
      ), url("$lib/images/background2.png")
	}
</style>
<div class="w-[100lvw] h-[100lvh] fixed -z-10 custombg bg-center bg-cover"></div>
<!-- !! CUSTOM BG !! -->

<Title>
	{m.rules_title()}
</Title>

<PageDescription>
	{m.rules_description_pre()}<br><LocalizedRichText msg={m.rules_description_bold} />
</PageDescription>

	<Main>
		<div class="max-w-250">
			<Hotlink id="general" title={m.rules_general_title()}>
				<div class="mb-4">
					{m.rules_general_p1()}
				</div>

				<div class="mb-4">
					{m.rules_general_p2()}
					<ul class="list-disc list-inside ml-2">
						<li>{m.rules_general_li1()}</li>
						<li>
							<LocalizedRichText msg={m.rules_general_li2} />
						</li>
						<li>
							{m.rules_general_li3()}
						</li>
					</ul>
				</div>
			</Hotlink>

			<Hotlink id="cheating" title={m.rules_cheating_title()}>
				<div class="mb-4">
					<LocalizedRichText msg={m.rules_cheating_p1} /><!--, <b>även i PVP-zoner</b>-->
				</div>
				<div class="mb-4">
					{m.rules_cheating_p2()}
					<ul class="list-disc list-inside ml-2">
						<li>{m.rules_cheating_li1()}</li>
						<li>X-ray</li>
						<li>{m.rules_cheating_li3()}</li>
						<li>{m.rules_cheating_li4()}</li>
					</ul>
				</div>
				<div class="mb-4">
					{m.rules_cheating_p3()}
				</div>
			</Hotlink>

			<Hotlink id="machines" title={m.rules_machines_title()}>
				<div class="mb-4">
					{m.rules_machines_p1()}
				</div>
				<div class="mb-4">
					<LocalizedRichText msg={m.rules_machines_p2} />
				</div>
				<div class="mb-4">
					{m.rules_machines_p3()}
				</div>
			</Hotlink>

			<Hotlink id="survival" title={m.rules_survival_title()}>
				<div class="mb-4">
					<LocalizedRichText msg={m.rules_survival_p1} />
				</div>
				<div class="mb-4">
					<ul class="list-disc ml-6">
						<li class="mb-2">
							<LocalizedRichText msg={m.rules_survival_li1} />
						</li>
						<li class="mb-4">
							<LocalizedRichText msg={m.rules_survival_li2} />
						</li>
					</ul>
				</div>
			</Hotlink>
		</div>
	</Main>