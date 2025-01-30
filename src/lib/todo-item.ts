import { ToDoItemStatus } from './todo-item-status';
export class ToDoItem {
	private readonly id: string;
	private content: string;
	private status: ToDoItemStatus;

	constructor(content: string) {
		this.id = crypto.randomUUID();
		this.content = content;
		this.status = ToDoItemStatus.NEW;
	}

	public setContent(content: string): void {
		this.content = content;
	}

	public setStatus(status: ToDoItemStatus): void {
		this.status = status;
	}

	public getId(): string {
		return this.id;
	}

	public getContent(): string {
		return this.content;
	}

	public getStatus(): ToDoItemStatus {
		return this.status;
	}
}
