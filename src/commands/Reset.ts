import { Command } from '../index';
import { CommandClass } from '../decorator';

let command = new CommandClass("reset");

@command.cls()
export class Reset extends Command {
	// @command.func()
	func(): void {
		this.respond("Resetting all progress.");
		this.reset();
	}

	desc(): string { return "Resets all progress."; }
	usage(): string { return "reset"; }
}