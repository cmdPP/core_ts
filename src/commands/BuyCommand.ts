import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("buyCommand");

@command.cls()
export class SellData extends Command {

	aliases: string[] = ['apt-get'];

	// @command.func()
	func(cmdName: string): void {
		let response: string[] = [];
		if (cmdName && cmdName in this.commands) {
			let cmd = this.commands[cmdName];
			if (this.data >= cmd.price) {
				if (!cmd.unlocked) {
					cmd.unlocked = true;
					this.removeData(cmd.price);
					response = [`Unlocked "${cmdName}" for ${this.formatToString(cmd.price)}.`];
				} else {
					response = ["Command has already been unlocked."];
				}	
			} else {
				response = ["You don't have enough data to purchase that command."];
			}
		} else {
			response = ['Command not found for purchase.'];
		}
		this.respond(...response);
	}

	// @command.desc()
	desc(): string[] {
		let cmds: string[] = [];
		for (let cmdName in this.commands) {
			let cmd = this.commands[cmdName];
			if (!cmd.unlocked && cmd.price !== 0) {
				cmds.push(`\t${cmdName}: ${this.formatToString(cmd.price)}`);
			}
		}
		return [
			"Purchases and unlocks a command.",
			"Available commands:",
			...cmds
		];
	}

	usage(): string { return "buyCommand {command}"; }
}