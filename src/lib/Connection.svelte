<script lang="ts">
  import ReconnectingWebSocket from "reconnecting-websocket"
  import { onDestroy, onMount } from "svelte"

  export let onmessage: (event: MessageEvent) => Promise<void>

  export let url: string

  let ws: ReconnectingWebSocket

  onMount(() => {
    console.log("Connecting to", url)

    ws = new ReconnectingWebSocket(url, [], {
      maxReconnectionDelay: 1000,
      minReconnectionDelay: 500,
      reconnectionDelayGrowFactor: 1,
      connectionTimeout: 1000,
      maxRetries: Infinity,
      debug: false,
    })
    ws.onmessage = onmessage
  })

  onDestroy(() => {
    if (ws) {
      ws.close()
    }
  })
</script>
