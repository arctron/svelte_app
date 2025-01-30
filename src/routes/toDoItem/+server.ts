import { ToDoListService } from '$lib/todo-list-service';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const userId = cookies.get('userId') ?? 'defaultUserId';
	const { content } = await request.json();
	const toDoItemId = ToDoListService.getInstance().addToDoItem(userId, content);
	return json({ toDoItemId }, { status: 201 });
}
