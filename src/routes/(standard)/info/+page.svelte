<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
</script>

<div class="m-t20 p-b300px">
	<PageCard>
		<div class="p-4 max-w-60vw">
			<Hotlink id="lore" title="Lore">
				METAcraft har en spännande historia och en levande lore. Mysterier och hemligheter finns
				attupptäcka för den som är nyfiken. Under serverns gång kommer berättelsen att utvecklas,
				och event att ändra på världen.
			</Hotlink>
			<Hotlink id="event" title="Event">
				Byggtävlingar, PvP-turneringar, och andra event kommer att hållas med jämna mellanrum.
				Förutom seger och ära kan det finnas fina priser att vinna. Eventen är öppna för alla på
				servern.
			</Hotlink>
			<Hotlink id="wilderness" title={'Vildmarken'}>
				För de som vill visa vad de går för finns Vildmarken. Vildmarken är ett PvP-område där det
				är tillåtet att stjäla, förstöra, och döda andra spelare. Fusk är fortfarande inte tillåtet, <a
					href="/rules#wilderness">läs reglerna</a
				> för mer information.
			</Hotlink>
			<Hotlink id="empire" title="Imperiet">
				Innanför imperiets murar (och i den säkra södern) råder Borgarorderns skydd. Här kan spelare
				kan bygga och bo utan att behöva oroa sig för att bli attackerade. I imperiets mitt ligger
				också Campus, där spelare kan mötas och byteshandla med varandra.
			</Hotlink>
			<Hotlink id="qol" title={'Vanilla+'}>
				Servern har en mängd olika små mods och datapack installerade för att förbättra kvalitén på
				livet i Minecraft. Se listan med <a href="/tweaks">Justeringar</a> och
				<a href="/mods">Mods</a>
			</Hotlink>
			<Hotlink id="mechanics" title={'Tekniska detaljer'}>
				Servern använder sig av Fabric och en mängd olika mods för att förbättra spelupplevelsen,
				samtidigt som den behåller en så vanilla-lik upplevelse som möjligt. Spelare kan bygga
				avancerade maskiner och farma mobs, och utöver de nämna justeringarna lite på att funktioner
				är bevarade.
			</Hotlink>
		</div>
	</PageCard>
</div>
