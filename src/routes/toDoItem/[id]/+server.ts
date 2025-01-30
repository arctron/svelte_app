import { ToDoListService } from '$lib/todo-list-service';
import { json } from '@sveltejs/kit';

export async function GET({ params, cookies }) {
	const toDoItemId = params.id;
	const userId = cookies.get('userId') ?? 'defaultUserId';
	console.log(
		'Returning the following toDoItem: ',
		ToDoListService.getInstance().getToDoItem(userId, toDoItemId)
	);
	const toDoItem = ToDoListService.getInstance().getToDoItem(userId, toDoItemId);
	return json({ toDoItem }, { status: 200 });
}
