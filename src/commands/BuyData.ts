import { Command } from '../index';
import { CommandClass } from '../decorator';

let command = new CommandClass("buyData");

@command.cls()
export class BuyData extends Command {

	price: number = 150;

	// @command.func()
	func(amt: string, unit: string = "B"): void {
		let numAmt = this.formatToNumber(amt, unit);
		if (!numAmt) {
			this.respond("Error.");
			this.command("help buyData");
			return;
		}

		let response: string[] = [];
		let cost = numAmt * 2;
		if (this.money >= cost && this.checkStorage(numAmt)) {
			this.removeMoney(cost);
			this.addData(numAmt);
			response = [`${amt} data bought with $${cost}`];
		} else {
			response = ["You do not have enough money."];
		}
		this.respond(...response);
	}

	desc(): string { return "Converts money to data. The conversion is 1 byte for $2."; }
	usage(): string { return "buyData {amt} [unit]"; }
}