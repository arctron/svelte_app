<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

    let itemId = $state(0);
	let queryParam = $state('');

	let serverResponse = $state();

	async function fetchData() {
		const serverUrl = `http://127.0.0.1:8000/items/${itemId}/?q=${queryParam}`;
		const response = await fetch(serverUrl);
		serverResponse = await response.json();
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>{JSON.stringify(data.info)}</p>

<br />
<br />

<label>
	Enter the query parameter:
	<input type="text" bind:value={queryParam} />
    Enter the item id:
    <input type="number" bind:value={itemId} />
	<button onclick={fetchData}>Submit</button>
</label>

<h3>Response received from server: {JSON.stringify(serverResponse)}</h3>
