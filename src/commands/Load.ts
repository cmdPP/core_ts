import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("load");

@command.cls()
export class Load extends Command {
	// @command.func()
	func(): void {
		this.load();
	}

	desc(): string { return "Loads previously saved games."; }
	usage(): string { return "load"; }
}