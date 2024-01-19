<script lang="ts">
  import { page } from "$app/stores"
  import ReconnectingWebSocket from "reconnecting-websocket"
  import Connection from "$lib/Connection.svelte"

  import { enhance, applyAction } from "$app/forms"
  import { goto } from "$app/navigation"
  /** @type {import('./$types').ActionData} */
  export let form
  /** @type {import('./$types').PageData} */
  export let data
  async function onmessage(event: MessageEvent) {
    console.log("onmessage: ", JSON.parse(event.data))
  }
</script>

{#if $page.data.session}
  <h1>Protected page</h1>
  <Connection
    {onmessage}
    url={`wss://v1i68zmu1f.execute-api.us-west-1.amazonaws.com/wss?id_token=${$page.data.session.user.aws}`}
  />

  <p>
    This is a protected content. You can access this content because you are
    signed in.
  </p>
  <p>Session expiry: {$page.data.session?.expires}</p>
  <form method="POST" action="?/getChannels" use:enhance>
    <button>HI</button>
  </form>
{:else}
  <h1>Access Denied</h1>
  <p>
    <a href="/auth/signin"> You must be signed in to view this page </a>
  </p>
{/if}

<style>
  div {
    margin: 0;
    padding-bottom: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }

  #form {
    background: rgba(0, 0, 0, 0.15);
    padding: 0.25rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 3rem;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
  }
  #input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 2rem;
    margin: 0.25rem;
  }
  #input:focus {
    outline: none;
  }
  #form > button {
    background: #333;
    border: none;
    padding: 0 1rem;
    margin: 0.25rem;
    border-radius: 3px;
    outline: none;
    color: #fff;
  }

  #messages {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  #messages > li {
    padding: 0.5rem 1rem;
  }
  #messages > li:nth-child(odd) {
    background: #efefef;
  }
</style>
