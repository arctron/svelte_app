<script lang="ts">
	let { data } = $props();

	async function getToDoItem(toDoItemId: string) {
		const response = await fetch(`/toDoItem/${toDoItemId}`, {
			method: 'GET'
		});
		const { toDoItem } = await response.json();
		return toDoItem;
	}

	async function addToDoItem(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const content = formData.get('content')?.toString().trim() ?? '';
		if (content.length > 0) {
			const response = await fetch('/toDoItem', {
				method: 'POST',
				body: JSON.stringify({ content }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const { toDoItemId } = await response.json();
			const toDoItem = await getToDoItem(toDoItemId);
			const toDoItems = [...data.toDoItems, toDoItem];
			data = { ...data, toDoItems };
		}
	}

	async function deleteToDoItem(toDoItemId: string) {
		console.log('Delete', toDoItemId);
		const response = await fetch(`/toDoItem/${toDoItemId}`, {
			method: 'DELETE'
		});
		const status = response.status;
		if (status === 204) {
			const toDoItems = data.toDoItems.filter(
				(toDoItem: { id: string }) => toDoItem.id !== toDoItemId
			);
			data = { ...data, toDoItems };
		}
	}
</script>

<div>
	<h1>Your To Do List</h1>
	<h2>Your userId is {data.userId}</h2>
</div>

<div>
	<form onsubmit={addToDoItem}>
		<input type="text" name="content" autocomplete="off" required />
		<button type="submit">Add</button>
	</form>
</div>

<div>
	<ul>
		{#each data.toDoItems as toDoItem (toDoItem.id)}
			<li>
				<span>{toDoItem.id}:{toDoItem.content}:{toDoItem.status}</span>
				<button onclick={() => deleteToDoItem(toDoItem.id)}>Delete</button>
			</li>
		{/each}
	</ul>
</div>
