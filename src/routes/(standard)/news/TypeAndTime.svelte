<script lang="ts">

  export let date = '';
  export let type = 'post';
  export let style = '';

  let dateString: string;

  if (date !== '') {
    dateString = new Date(date).toLocaleDateString('sv-SE', {'weekday': 'long', 'year': 'numeric', 'month': 'short', 'day': '2-digit'});
  }
</script>

<p class="text-sm md:text-base {style}">
  <span class="hidden sm:inline text-sm font-bold uppercase">{type} ・ </span>
  {dateString}
</p>