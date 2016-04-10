import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("autoMine");

@command.cls()
export class AutoMine extends Command {

	price: number = 20;

	// @command.func()
	func(action: string): void {
		if (['start', 'stop'].indexOf(action) === -1) {
			this.respond("Unrecognized parameter.");
			this.command("help autoMine");
			return;
		}
		let response: string[] = [];
		if (action === "start") {
			if (this.checkStorage()) {
				this.isAutoMining = true;
				response = [`Automatic mining beginning at a rate of ${this.formatToString(this.autoIncrement)} byte(s)per second.`];
			} else {
				response = ['Your storage is full. Please upgrade storage to continue.'];
			}
		} else if (action === "stop") {
			this.isAutoMining = false;
			response = ['Automatic mining has been stopped.'];
		}
		this.respond(...response);
	}

	// @command.desc()
	desc(): string { return `Increments your data every second by {${this.formatToString(this.autoIncrement)}}.`; }

	usage(): string { return "autoMine (start | stop)"; }
}