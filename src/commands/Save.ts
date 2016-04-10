import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("save");

@command.cls()
export class Save extends Command {
	// @command.func()
	func(): void {
		this.save();
	}

	desc(): string { return "Saves progress."; }
	usage(): string { return "save"; }
}