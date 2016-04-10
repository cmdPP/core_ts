import { Command } from '../index';
import { CommandClass } from '../decorator';

let command = new CommandClass("upgrade");

@command.cls()
export class Upgrade extends Command {
	// @command.func()
	func(command: string): void {
		let response: string[] = [];
		if (command === "mineData") {
			let currentCost = Math.floor((this.increment + 1) * 1.5);
			if (this.removeMoney(currentCost)) {
				this.increment++;
				response = [`mineData upgraded to increment {${this.formatToString(this.increment)}} for {$${currentCost}}`];
			} else {
				response = [`You require $${currentCost} to purchase this upgrade.`];
			}
		} else if (command === "storage") {
			let target = this.storage.upgrade;
			if (!target) {
				this.respond("You already have the largest stoarge capacity.");
				return;
			}

			if (this.removeMoney(target.price)) {
				this.storage.current = target;
				response = [
					`Storage upgraded to {${target.name}} for {$${target.price}}`,
					`New capacity: {${this.formatToString(target.capacity)}}`
				];
			} else {
				response = [`You require $${target.price} to purchase this upgrade.`];
			}
		} else {
			response = [`Command "${command}" either does not exist or cannot be upgraded.`];
		}
		this.respond(...response);
	}

	// @command.desc()
	desc(): string[] {
		let response: string[] = [];
		let incVal = this.increment + 1;
		let incCost = Math.floor(incVal * 1.5);

		response.push(...[
			"mineData",
			`\tCurrent value: {${this.increment}}`,
			"\tNext upgrade:",
			`\t\tValue: {${incVal}}`,
			`\t\tPrice: {$${incCost}}`
		]);

		let target = this.storage.upgrade;
		if (target) {
			response.push(...[
				"storage:",
				`\tCurrent name: {${this.storage.name}}`,
				`\tCurrent capacity: {${this.formatToString(this.storage.capacity)}}`,
				"\tNext upgrade:",
				`\t\tName: {${target.name}}`,
				`\t\tCapacity: {${this.formatToString(target.capacity)}}`,
				`\t\tPrice: {$${target.price}}`
			]);
		}

		let newRes: string[] = [];
		for (let res of response) {
			newRes.push(`\t${res}`);
		}
		return [
			"Purchases command upgrades.",
			"Available upgrades:",
			...newRes
		];
	}
	usage(): string { return "upgrade {thing}"; }
}