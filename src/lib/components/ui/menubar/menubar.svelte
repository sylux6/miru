<script lang='ts'>

  import Wrapper from './wrapper.svelte'

  import native from '$lib/modules/native'
  import { click } from '$lib/modules/navigate'
  import { debug, SUPPORTS } from '$lib/modules/settings'

  function tabindex (node: HTMLElement) {
    node.tabIndex = -1
  }
  let fullscreenElement: HTMLElement | null = null
</script>

<svelte:document bind:fullscreenElement />

{#if !SUPPORTS.isAndroid}
  <Wrapper let:platform>
    <div class='w-[calc(100%-3.5rem)] left-[3.5rem] top-0 z-[2000] flex navbar absolute h-8'>
      <div class='w-full {fullscreenElement ? 'not-draggable' : 'draggable'}' />
      {#if platform !== 'macOS'}
        <div class='window-controls not-draggable flex text-white backdrop-blur'>
          <button class='max-button flex items-center justify-center h-8 w-[46px]' use:click={native.minimise} use:tabindex>
            <svg class='svg-controls w-3 h-3' role='img' viewBox='0 0 12 12'><rect fill='currentColor' height='1' width='10' x='1' y='6' />
          </button>
          <button class='restore-button flex items-center justify-center h-8 w-[46px]' use:click={native.maximise} use:tabindex>
            <svg class='svg-controls w-3 h-3' role='img' viewBox='0 0 12 12'><rect fill='none' height='9' stroke='currentColor' width='9' x='1.5' y='1.5' />
          </button>
          <button class='close-button flex items-center justify-center h-8 w-[46px]' use:click={native.close} use:tabindex>
            <svg class='svg-controls w-3 h-3' role='img' viewBox='0 0 12 12'><polygon fill='currentColor' fill-rule='evenodd' points='11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1' />
          </button>
        </div>
      {/if}
    </div>
  </Wrapper>
{/if}
{#if $debug}
  <div class='ribbon z-[1000] text-center fixed font-bold pointer-events-none'>Debug Mode!</div>
{/if}

<style>
  .ribbon {
    background: #f63220;
    box-shadow: 0 0 0 999px #f63220;
    clip-path: inset(0 -100%);
    inset: 0 auto auto 0;
    transform-origin: 100% 0;
    transform: translate(-29.3%) rotate(-45deg);
  }
  .window-controls {
    background: rgba(24, 24, 24, 0.1);
  }
  .window-controls button:hover {
    background: rgba(128, 128, 128, 0.2);
  }
  .window-controls button:active {
    background: rgba(128, 128, 128, 0.4);
  }
  .close-button:hover {
    background: #e81123 !important;
  }
  .close-button:active {
    background: #f1707a !important;
  }
</style>
