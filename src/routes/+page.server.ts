import { ToDoListService } from '$lib/todo-list-service';

export function load({ cookies }) {
	if (!cookies.get('userId')) {
		cookies.set('userId', crypto.randomUUID(), { path: '/' });
	}

	return {
		userId: cookies.get('userId'),
		toDoItems: JSON.parse(
			JSON.stringify(
				ToDoListService.getInstance().getToDoItems(cookies.get('userId') ?? 'defaultUserId')
			)
		)
	};
}
