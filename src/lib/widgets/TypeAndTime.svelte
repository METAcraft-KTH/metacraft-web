<script lang="ts">

  interface Props {
    date?: string;
    type?: string;
    style?: string;
  }

  let { date = '', type = 'post', style = '' }: Props = $props();

  let dateString: string = $state();

  if (date !== '') {
    dateString = new Date(date).toLocaleDateString('sv-SE', {'weekday': 'long', 'year': 'numeric', 'month': 'short', 'day': '2-digit'});
  }
</script>

<p class="text-xs sm:text-sm md:text-base {style}">
  <span class="font-bold uppercase">{type} ・ </span>
  {dateString}
</p>