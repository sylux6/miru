<script lang='ts'>
  import Icon from 'lucide-svelte/dist/Icon.svelte'

  import type { SvelteHTMLElements, SVGAttributes } from 'svelte/elements'

  type Attrs = SVGAttributes<SVGSVGElement>

  import { cn } from '$lib/utils'

  const iconNode: Array<[elementName: keyof SvelteHTMLElements, attrs: Attrs]> = [['path', { fill: 'currentColor', d: 'M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404l-1.989-2.458l-.02 5.285H.001L0 7.247h2.203l1.865 2.545l2.015-2.546zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779c.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.3 9.3 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.9 3.9 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687s.743-.264 1.107-.359a7.4 7.4 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.24 2.24 0 0 0-1.278 1.92l2.663.033l.038-1.81zm3.992-2.099v6.627l3.107.032l-.43 1.775h-4.807V7.187z' }]]

  let className = ''
  export { className as class }
</script>

<Icon name='myanimelist' class={cn(className, 'bg-[#3557a5] rounded px-[2px] text-white')} color='none' {...$$restProps} {iconNode} strokeWidth='1' viewBox='0 0 24 24'>
  <slot />
</Icon>
