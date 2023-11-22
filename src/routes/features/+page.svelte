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
			<Hotlink id="metaborg" title="METAborg">
				METAborg är en säker stad i Civilisationen där spelare kan bygga och bo utan att behöva oroa
				sig för att bli attackerade. METAborg är också en plats där spelare kan mötas och
				byteshandla med varandra.
			</Hotlink>
			<Hotlink id="shopmod" title={'Shop-mod'}>
				För att göra byteshandel enklare finns en shop-mod installerad på servern. Med den kan
				spelare enkelt sätta upp butiker och köpa och sälja allt från föremål till verktyg och
				rustningar. Det finns ingen bestämd valuta, utan spelare får själva komma överens om vad de
				vill byta för och mot vad (men diamanter är alltid eftertraktade!).
			</Hotlink>
			<Hotlink id="qol" title={'Vanilla+'}>
				Servern har en mängd olika små mods och datapack installerade för att förbättra kvalitén på
				livet i Minecraft. Spelare och mobs kan tappa huvuden när de dör, och det ryktas om att den
				vandrande handlaren har små mini-block att sälja.
			</Hotlink>
			<Hotlink id="voicechat" title={'Voice chat'}>
				<a href="https://modrinth.com/plugin/simple-voice-chat">simple-voice-chat</a> finns installerat
				för de som vill enkelt prata med varandra i spelet. Men det är absolut inget krav att använda,
				Discord och chatten i spelet är fortfarande det primära sätten att kommunicera med andra spelare.
			</Hotlink>
			<Hotlink id="mechanics" title={'Tekniska detaljer'}>
				Servern använder sig av Fabric och en mängd olika mods för att förbättra spelupplevelsen,
				samtidigt som den behåller en så vanilla-lik upplevelse som möjligt. Spelare kan bygga
				avancerade maskiner och farma mobs.
			</Hotlink>
		</div>
	</PageCard>
</div>
