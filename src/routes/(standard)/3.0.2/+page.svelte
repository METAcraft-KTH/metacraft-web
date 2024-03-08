<script lang="ts">
  import Splash from "$lib/layout/standard/Splash.svelte";
  import Main from "$lib/layout/standard/Main.svelte";
  import Title from "$lib/layout/standard/Title.svelte";

  import img from "$lib/images/splashes/main.webp"; // ÄNDRA FÖR VARJE POST

  import mk2 from "./mk2.png";
  import mk3 from "./mk3.png";

	import TypeAndTime from "$lib/widgets/TypeAndTime.svelte";
  $: url = `url('${img}')`;

  let post = true;
</script>

<!-- TODO: gör det här elementet till en layout? -->
<div class="w-100% flex flex-col bg-stone">

  <Splash --image={url}>
    <Title {post}>
      3.0.2
    </Title>
  </Splash>

  <Main {post}>
    <div class="text-center w-100%">
      <TypeAndTime type={'update'} date={'2024-2-9'} style={'mb-6 md:mb-10'} />
    </div>
    <!-- TODO: make these into $lib/textstyle components -->
    <p class="mb-12">
      En liten uppdatering har släppts för METAcraft! Servern har nu startats om.
      <br>
      Här är de viktigaste nyheterna:
    </p>
    <h1 class="text-2xl font-bold mb-3">BYGGTÄVLING</h1>
    <p class="mb-6">
      Alla vet att om du fick tag på den genomsnittliga studenten och frågade om dennes största kritik mot KTH, så skulle 9 av 10 svara att KTH aldrig expanderar med nya byggnader. Det är förstås inte helt skolans fel, men nu har vi chansen att ge folket det de verkligen vill ha.
    </p>
    <p class="mb-6">
      <b>Byggtävlingen</b> är ett event som löper från 16 februari till 1 mars. Under eventet kommer alla deltagare få varsin yta mark intill campuset att bygga vad man vill. När tävlingen är över kommer vi demokratiskt utse en vinnare, vars bygg kommer placeras på campus bakom biblioteket.
    </p>
    <p class="mb-12">
      Mer information kommer!
    </p>
    
    <h1 class="text-2xl font-bold mb-3">GRUVVAGN MK. III</h1>
    <p class="mb-3 text-center text-neutral italic">
      EDIT: På grund av kommunikationsfel räknas denna del av inlägget som <b>non-canon</b>.<br>Den är endast inkluderade här av arkiverande skäl.
    </p>
    <p class="mb-6 line-through">
      Dr Alpert Horten har etablerat kontakt med Borgarordens forskare! Med hans hjälp har vi gjort enorma forskningsframsteg, bland annat den revolutionerande apparaten som kan tillverka objekt helt utan mänsklig tillverkan (se förra changelog ovan).
    </p>
    <p class="mb-12 line-through">
      Till denna vecka har vi framställt ett nytt material: Inte netherit, men tillräckligt bra! Dr Horten menar att materialen kan låta oss laga netherit-utrustningar utan netherit! Informationen om receptet finns i hans kontor på campus.
    </p>
    <h1 class="text-2xl font-bold mb-3">GRUVVAGN MK. III</h1>
    <p class="mb-6">
      Gruvvagnar är bra för transport men de är långsamma, trots modern teknologi. Tack vare Dr Horten och hans efterforskningar på magmakräm lyckades vi förbättra Gruvvagn Mk. II ännu mer: Vi presenterar *Gruvvagn Mk. III som höjer maxhastigheten till 30 blocks per sekund!
      <br><br>
      <i class="italic">*receptet till Gruvvagn Mk. III kräver Gruvvagn Mk. II.</i>
    </p>
    <img src={mk2} alt={'mk2 recipe'} class="max-w-100 mb-2" />
    <img src={mk3} alt={'mk3 recipe'} class="max-w-100 mb-6" />
    <p class="mb-6">
      Det var allt från oss denna vecka! Ha så kul!
    </p>
  </Main>


</div>