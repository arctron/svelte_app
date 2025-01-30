import { ToDoItemStatus } from '$lib/todo-item-status.js';
import { ToDoListService } from '$lib/todo-list-service';
import { json } from '@sveltejs/kit';

export async function GET({ params, cookies }) {
	const toDoItemId = params.id;
	const userId = cookies.get('userId') ?? 'defaultUserId';
	const toDoItem = ToDoListService.getInstance().getToDoItem(userId, toDoItemId);
	return json({ toDoItem }, { status: 200 });
}

export async function DELETE({ params, cookies }) {
	const toDoItemId = params.id;
	const userId = cookies.get('userId') ?? 'defaultUserId';
	ToDoListService.getInstance().removeToDoItem(userId, toDoItemId);
	return new Response(null, { status: 204 });
}

export async function PATCH({ params, cookies, request }) {
	const toDoItemId = params.id;
	const userId = cookies.get('userId') ?? 'defaultUserId';
	const { status } = await request.json();
	if (status === ToDoItemStatus.IN_PROGRESS) {
		ToDoListService.getInstance().moveItemToInProgress(userId, toDoItemId);
	} else if (status === ToDoItemStatus.DONE) {
		ToDoListService.getInstance().moveItemToDone(userId, toDoItemId);
	}
	const updatedToDoItem = ToDoListService.getInstance().getToDoItem(userId, toDoItemId);
	return json({ toDoItem: updatedToDoItem }, { status: 200 });
}
