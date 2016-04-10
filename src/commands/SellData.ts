import { Command } from '../';
import { CommandClass } from '../decorator';

let command = new CommandClass("sellData");

@command.cls()
export class SellData extends Command {

	price: number = 250;

	// @command.func()
	func(amt: string, unit: string = "B"): void {
		let numAmt: number = this.formatToNumber(amt, unit);
		if (!numAmt) {
			this.respond("Error.");
			this.command("help sellData");
			return;
		}
		let response: string[] = [];
		if (this.data >= numAmt && numAmt >= 100) {
			let loss = Math.floor(Math.random() * 15 + 10);
			let transfer = Math.round(numAmt * (1 - loss / 100));

			this.addMoney(transfer);
			this.removeData(transfer);
			response = [`${loss}% data integrity lost in transfer.`, `Data sold: ${amt}. Money gained: $${transfer}.`];
		} else {
			response = ["You must sell at least 100 data. Please make sure you have 100 data."];
		}
		this.respond(...response);
	}

	desc(): string {
		return "Converts data to money. The conversion is 1 byte for $1, but the data deteriorates during the process.";
	}
	usage(): string { return "sellData {amt} [unit]"; }
}