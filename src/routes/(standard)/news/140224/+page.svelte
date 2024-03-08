<script lang="ts">
  import Splash from "$lib/layout/standard/Splash.svelte";
  import Main from "$lib/layout/standard/Main.svelte";
  import Title from "$lib/layout/standard/Title.svelte";

  import img from "$lib/images/background2.png"; // ÄNDRA FÖR VARJE POST
	import TypeAndTime from "$lib/widgets/TypeAndTime.svelte";
  let url = `url(${img})`;

  let dateString = new Date('2024-2-14').toLocaleDateString('sv-SE', {'weekday': 'long', 'year': 'numeric', 'month': 'short', 'day': '2-digit'});
  let post = true;
</script>

<!-- TODO: gör det här elementet till en layout? -->
<div class="w-100% flex flex-col bg-stone">

  <Splash --image={url}>
    <Title {post}>
      TEST POST, PLEASE IGNORE
    </Title>
  </Splash>

  <Main {post}>
    <TypeAndTime date={'2024-2-14'} style={'mb-6 md:mb-10'} />
    <!-- TODO: make these into $lib/textstyle components -->
    <p class="mb-6">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore vitae repellendus possimus quaerat debitis sed veniam. Quisquam esse optio recusandae tempore quaerat ullam vel, magnam voluptatibus eum, dolor impedit laborum.
    </p>
    <p class="mb-6">
      Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.
    </p>
    <p class="mb-6">
      What makes me a good Demoman? If I were a bad Demoman, I wouldn't be sittin' here, discussin' it with you now would I? Let's do it! Not one of ya's gonna' survive this! One crossed wire, one wayward pinch of potassium chlorate, one errant twitch... and kablooie! I got a manky eye. I'm a black, Scottish cyclops. So T'all you fine dandies so proud, so cocksure! Prancin' aboot with your heads full of eyeballs! Come and get me I say!I'll be waiting on ya with a whiff of the 'ol brimstone. I'm a grim bloody fable... with an unhappy bloody end! Oh, they're going to have to glue you back together... in hell!
    </p>
    <p class="mb-6">
      The Boomerang Nebula, located roughly 5,000 light-years away from our solar system, has a temperature of 1 Kelvin (-272 °C or -460 °F) making it the coldest natural place in the universe humanity has discovered. First found in 1995 by astronomers in Chile, we have since learned quite a bit about it. The Boomerang Nebula is a young planetary nebula which has reached such cold temperatures due to its unusually rapid expansion. However, recently, modern online enthusiasts have raised one question science has yet been unable to answer: <b>is it sus?</b>

      The profound similarities between the Boomerang Nebula and the characters from the hit game Among Us have led many to believe that the Boomerang Nebula is, in fact, awfully sus, but science has yet to confirm, deny, or even respond to these questions.

      Follow for more updates on this developing story.
    </p>
    <p class="mb-6">
      ඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞඞ
    </p>
  </Main>


</div>