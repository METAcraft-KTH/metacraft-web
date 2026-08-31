<script lang="ts" generics="Option, Value">
  interface Props {
    /** Options to choose between, in display order. */
    options: Option[];
    /** The selected option's value. */
    selected: Value;
    /** The value an option stands for. Defaults to the option itself. */
    value?: (option: Option) => Value;
    /** Text shown on each button. */
    label: (option: Option) => string;
    /** Optional icon above the label. */
    icon?: import('svelte').Snippet<[Option]>;
  }

  let {
    options,
    selected = $bindable(),
    value = (option) => option as unknown as Value,
    label,
    icon
  }: Props = $props();
</script>

<div class="flex flex-row bg-calcite mx-auto mb-8 rounded-xl max-w-200 overflow-hidden">
  {#each options as option (label(option))}
    <button
      class={[
        "flex flex-col flex-1 items-center p-2 border-none transition-colors notButton",
        selected === value(option) && "bg-blue-500/30 text-blue-900",
        selected !== value(option) && "bg-transparent",
      ]}
      aria-pressed={selected === value(option)}
      onmousedown={() => {selected = value(option)}}
    >
      {@render icon?.(option)}
      <span class="font-mc">{label(option)}</span>
    </button>
  {/each}
</div>
