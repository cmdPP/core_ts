import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("mineData");

@command.cls()
export class MineData extends Command {
	@command.func()
	func(): void {
		let response: string[] = [];
		if (this.checkStorage()) {
			response = ['Data mined.'];
			this.addData(this.increment);
		} else {
			response = ["Your storage is full. Please upgrade storage to continue."];
		}
		this.respond(...response);
	}

	@command.desc()
	desc(): string {
		return `Increments data by your increment amount. You current increment is {${this.formatToString(this.increment)}}`;
	}

	usage(): string { return "mineData"; }
}