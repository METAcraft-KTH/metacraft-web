<script lang="ts">
    import Splash from "$lib/layout/standard/Splash.svelte";
    import Main from "$lib/layout/standard/Main.svelte";
    import Title from "$lib/layout/standard/Title.svelte";
    import TypeAndTime from "$lib/widgets/TypeAndTime.svelte";
	import Button from "$lib/widgets/Button.svelte";

    import fallback_post_image from '$lib/images/pr_squares/survival.png';

    import PostsIndex from "../Posts.json";
    
    import { page } from '$app/stores'
	import { onMount } from 'svelte';
	import { error } from "@sveltejs/kit";
	import Header from "$lib/layout/Header.svelte";
	import Footer from "$lib/layout/Footer.svelte";

    let post = true;

    let postid = $page.params.postid;
    let postContent: any; // svelte component
    onMount(async () => {
        postContent = (await import(`./${postid}.svelte`)).default;
    })

    // find post from postindex
    let ThisPost = undefined;
    for (let PostItem of PostsIndex) {
        if (PostItem.href !== postid) continue;
        ThisPost = PostItem;
        break;
    }
    if (ThisPost === undefined) throw error(404);

    // get (links of) all the images from the directory
    let post_images_array = Object.values(import.meta.glob('$lib/images/posts/*.{png,webp}', { eager: true, import: 'default' }));
    // i just want to find the image for this particular post
    let ThisImage = undefined
    let datename = ThisPost.date.replaceAll("/","")
    for (let link of post_images_array) {
        let index = link.match(/^.+\/([a-zA-Z0-9\-_]+)(\.[a-zA-Z0-9]+)+$/i)[1];
        if (ThisPost.image === index || datename === index) {
            ThisImage = link;
            break;
        }
    }
    if (ThisImage === undefined)
        if (ThisPost.image?.startsWith("http")) ThisImage = ThisPost.image;
        else ThisImage = fallback_post_image;

</script>

<Header />
  
  <!-- TODO: gör det här elementet till en layout? -->
  <div class="w-100% flex flex-col bg-stone">
  
    <Splash --image={"url("+ThisImage+")"}>
        <Title {post}>
            {ThisPost.title}
        </Title>
    </Splash>
  
    <Main {post} back_button={true}>
        <div class="text-center w-100%">
            <TypeAndTime type={ThisPost.type} date={ThisPost.date} style={'mb-6 md:mb-10'} />
        </div>
        <svelte:component this={postContent} />

    </Main>
  
  
  </div>

<Footer />