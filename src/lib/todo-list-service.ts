import { ToDoItem } from './todo-item';
import { ToDoItemStatus } from './todo-item-status';
import { ToDoListRepository } from './todo-list-repository';

export class ToDoListService {
	private static instance: ToDoListService | null = null;
	private readonly repository: ToDoListRepository;
	private constructor() {
		this.repository = new ToDoListRepository();
	}
	public static getInstance(): ToDoListService {
		if (!this.instance) {
			this.instance = new ToDoListService();
		}
		return this.instance;
	}
	public addToDoItem(userId: string, content: string): string {
		const toDoItem = new ToDoItem(content);
		this.repository.addToDoItem(userId, toDoItem);
		return toDoItem.getId();
	}

	public removeToDoItem(userId: string, toDoItemId: string): void {
		this.repository.removeToDoItem(userId, toDoItemId);
	}

	public moveItemToInProgress(userId: string, toDoItemId: string): void {
		this.repository.updateToDoItemStatus(userId, toDoItemId, ToDoItemStatus.IN_PROGRESS);
	}

	public moveItemToDone(userId: string, toDoItemId: string): void {
		this.repository.updateToDoItemStatus(userId, toDoItemId, ToDoItemStatus.DONE);
	}

	public getToDoItem(userId: string, toDoItemId: string): ToDoItem | undefined {
		return this.repository.getToDoItem(userId, toDoItemId);
	}

	public getToDoItems(userId: string): ToDoItem[] {
		return this.repository.getToDoItems(userId);
	}
}
