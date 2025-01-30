import type { ToDoItem } from './todo-item';
import type { ToDoItemStatus } from './todo-item-status';

export class ToDoListRepository {
	private readonly db: Map<string, ToDoItem[]>;

	constructor() {
		this.db = new Map<string, ToDoItem[]>();
	}

	public addToDoItem(userId: string, toDoItem: ToDoItem): void {
		if (!this.db.has(userId)) {
			this.db.set(userId, []);
		}
		this.db.get(userId)!.push(toDoItem);
	}

	public removeToDoItem(userId: string, toDoItemId: string): void {
		if (this.db.has(userId)) {
			this.db.set(
				userId,
				this.db.get(userId)!.filter((toDoItem) => toDoItem.getId() !== toDoItemId)
			);
		}
	}

	public updateToDoItemStatus(userId: string, toDoItemId: string, status: ToDoItemStatus): void {
		if (this.db.has(userId)) {
			this.db.set(
				userId,
				this.db.get(userId)!.map((toDoItem) => {
					if (toDoItem.getId() === toDoItemId) {
						toDoItem.setStatus(status);
					}
					return toDoItem;
				})
			);
		}
	}

	public getToDoItem(userId: string, toDoItemId: string): ToDoItem | undefined {
		return this.db.get(userId)?.find((toDoItem) => toDoItem.getId() === toDoItemId);
	}

	public getToDoItems(userId: string): ToDoItem[] {
		return this.db.get(userId) ?? [];
	}
}
