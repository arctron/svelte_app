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
