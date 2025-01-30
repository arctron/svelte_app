<script lang="ts">
	import { ToDoItemStatus } from '$lib/todo-item-status.js';

	let { data } = $props();

	let newToDoItems = $derived(
		data.toDoItems.filter(
			(toDoItem: { status: ToDoItemStatus }) => toDoItem.status === ToDoItemStatus.NEW
		)
	);
	let inProgressToDoItems = $derived(
		data.toDoItems.filter(
			(toDoItem: { status: ToDoItemStatus }) => toDoItem.status === ToDoItemStatus.IN_PROGRESS
		)
	);
	let completedToDoItems = $derived(
		data.toDoItems.filter(
			(toDoItem: { status: ToDoItemStatus }) => toDoItem.status === ToDoItemStatus.DONE
		)
	);

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
			(event.target as HTMLFormElement).reset();
		}
	}

	async function deleteToDoItem(toDoItemId: string) {
		const response = await fetch(`/toDoItem/${toDoItemId}`, {
			method: 'DELETE'
		});
		if (response.status === 204) {
			const toDoItems = data.toDoItems.filter(
				(toDoItem: { id: string }) => toDoItem.id !== toDoItemId
			);
			data = { ...data, toDoItems };
		}
	}

	async function moveItemToStatus(toDoItemId: string, status: ToDoItemStatus) {
		const response = await fetch(`/toDoItem/${toDoItemId}`, {
			method: 'PATCH',
			body: JSON.stringify({ status: status }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { toDoItem } = await response.json();
		if (response.status === 200) {
			const toDoItems = data.toDoItems.filter(
				(toDoItem: { id: string }) => toDoItem.id !== toDoItemId
			);
			toDoItems.push(toDoItem);
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

{#if newToDoItems.length > 0}
	<div>
		<h3>New Items</h3>
		<ul>
			{#each newToDoItems as toDoItem (toDoItem.id)}
				<li>
					<span>{toDoItem.id}:{toDoItem.content}:{toDoItem.status}</span>
					<button onclick={() => moveItemToStatus(toDoItem.id, ToDoItemStatus.IN_PROGRESS)}
						>In Progress</button
					>
					<button onclick={() => deleteToDoItem(toDoItem.id)}>Delete</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}

{#if inProgressToDoItems.length > 0}
	<div>
		<h3>In Progress Items</h3>
		<ul>
			{#each inProgressToDoItems as toDoItem (toDoItem.id)}
				<li>
					<span>{toDoItem.id}:{toDoItem.content}:{toDoItem.status}</span>
					<button onclick={() => moveItemToStatus(toDoItem.id, ToDoItemStatus.DONE)}>Done</button>
					<button onclick={() => deleteToDoItem(toDoItem.id)}>Delete</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}

{#if completedToDoItems.length > 0}
	<div>
		<h3>Completed Items</h3>
		<ul>
			{#each completedToDoItems as toDoItem (toDoItem.id)}
				<li>
					<span>{toDoItem.id}:{toDoItem.content}:{toDoItem.status}</span>
					<button onclick={() => deleteToDoItem(toDoItem.id)}>Delete</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}
