import { Command } from '../index';
import { CommandClass } from '../decorator';

let command = new CommandClass("version");

@command.cls()
export class Version extends Command {
	// @command.func()
	func(): void {
		this.respond(`v${this.version}`);
	}

	desc(): string { return "Displays the current version."; }
	usage(): string { return "version"; }
}