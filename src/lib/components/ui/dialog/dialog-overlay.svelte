<script lang='ts'>
  import { Dialog as DialogPrimitive } from 'bits-ui'
  import { fade } from 'svelte/transition'

  import { cn } from '$lib/utils.js'

  type $$Props = DialogPrimitive.OverlayProps

  let className: $$Props['class'] = ''
  export let transition: $$Props['transition'] = fade
  export let transitionConfig: $$Props['transitionConfig'] = {
    duration: 150
  }
  export { className as class }
</script>

<DialogPrimitive.Overlay
  {transition}
  {transitionConfig}
  class={cn('custom-bg absolute inset-0 z-50 backdrop-blur-sm', className)}
  {...$$restProps}
/>
