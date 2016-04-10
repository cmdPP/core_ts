import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("currentStorage");

@command.cls()
export class CurrentStorage extends Command {
	// @command.func()
	func(): void {
		this.respond(...[
			'Your current storage is:',
			`\tName: ${this.storage.name}`,
			`\tCapacity: ${this.storage.capacity}`
		]);
	}

	desc(): string { return "Responds with your current storage."; }
	usage(): string { return "currentStorage"; }
}