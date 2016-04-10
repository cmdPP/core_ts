import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("alias");

@command.cls()
export class Alias extends Command {
	// @command.func()
	func(action: string, name: string, command: string): void {
		let response: string[] = [];
		if (!action || !name) {
			response = ['Insufficient parameters.'];
		} else if (action === "add" && !command) {
			response = ['Insufficient parameters.'];
		} else if (action !== "add" || action !== "remove") {
			response = ['Unrecognized action'];
		} else {
			if (action === "add") {
				this.playerAliases[name] = command;
				this.cmdAliases[name] = command;
				response = ['Alias added:', `\t${name} -> ${command}`];
			} else if (action === "remove") {
				if (name in this.playerAliases) {
					delete this.playerAliases[name];
					delete this.cmdAliases[name];
				} else {
					response = ['Player alias does not exist.'];
				}
			}
		}
		this.respond(...response);
	}

	// @command.desc()
	desc(): string[] {
		let aliases: string[] = [];

		for (let aliasName in this.playerAliases) {
			let alias = this.playerAliases[aliasName];
			aliases.push(`\t${aliasName} -> ${alias}`);
		}
		return [
			"Creates aliases for commonly used commands.",
			"Current player aliases:",
			...aliases
		];
	}
	usage(): string { return "alias (add | remove) {name} {command}"; }
}