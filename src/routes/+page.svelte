<script lang="ts">
	let { data } = $props();
	let content = $state('');

	async function getToDoItem(toDoItemId: string) {
		const response = await fetch(`/toDoItem/${toDoItemId}`, {
			method: 'GET'
		});
		const { toDoItem } = await response.json();
		console.log('toDoItem', toDoItem);
		return toDoItem;
	}

	async function addToDoItem() {
		const response = await fetch('/toDoItem', {
			method: 'POST',
			body: JSON.stringify({ content }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		content = '';
		const { toDoItemId } = await response.json();
		const toDoItem = await getToDoItem(toDoItemId);
		const toDoItems = [...data.toDoItems, toDoItem];
		data = { ...data, toDoItems };
	}
</script>

<div>
	<h1>Your To Do List</h1>
	<h2>Your userId is {data.userId}</h2>
</div>

<div>
	<form onsubmit={addToDoItem}>
		<input type="text" name="content" autocomplete="off" required bind:value={content} />
		<button type="submit">Add</button>
	</form>
</div>

<div>
	<ul>
		{#each data.toDoItems as toDoItem (toDoItem.id)}
			<li>{toDoItem.id} : {toDoItem.content} : {toDoItem.status}</li>
		{/each}
	</ul>
</div>
