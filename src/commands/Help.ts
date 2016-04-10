import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("help");

@command.cls()
export class Help extends Command {

	aliases: string[] = ['?'];

	@command.func()
	func(subject: string): void {
		let response: string[] = [];
		if (subject) {
			if (!(subject in this.commands)) {
				// this.respond("Command not found or no help is available. Type 'help' with no arguments to see a list of commands.");
				response = ['Command not found or no help is available. Type "help" with no arguments to see a list of commands.'];
			} else {
				let cmd = this.commands[subject];

				let desc = cmd.desc();
				let usage = cmd.usage();
				let aliases = cmd.aliases;

				console.log('Desc:', desc);
				console.log('Usage:', usage);
				console.log('Aliases:', aliases);

				if (Array.isArray(desc)) {
					response = [`${subject}: ${desc[0]}`, `To use: ${usage}\n\n`, ...desc.slice(1)];
				} else {
					response = [`${subject}: ${desc}`, `To use: ${usage}`];	
				}
				if (aliases.length > 0) {
					response.splice(1, 0, `Aliases: ${aliases.join(' ')}`);
				}
				// this.respond(...response);
			}
		} else {
			let commands: string[] = [];
			for (let cmdName in this.commands) {
				let cmd = this.commands[cmdName];
				if (cmd.unlocked) {
					commands.push(`\t${cmdName}`);
				}
			}
			response = [
				"List of commands:",
				""
			];
			response.push(...commands);
			response.push('\nFor specific command help type "help [command]"');
			// this.respond(...response);
		}
		this.respond(...response);
	}

	// @command.desc()
	desc(): string {
		return "Gives list of commands or specific instructions for commands.";
	}

	// @command.usage()
	usage(): string { return 'help {subject}'; }
}