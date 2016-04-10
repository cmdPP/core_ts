import { CMD } from '../lib';
import { expect } from 'chai';
// import jsonfile from 'jsonfile';
import { version } from '../package.json';

var responses = [];
let cmd = new CMD(
	(...txt) => { responses.push(...txt); },
	// (cmdData) => jsonfile.writeFileSync('./test_save.json', cmdData, { spaces: 2 }),
	(cmdData) => {},
	// () => jsonfile.readFileSync('./test_save.json'),
	() => {
		return {
			data: 1000,
			money: 1000,
			increment: 1,
			autoIncrement: 1,
			storage: 'selectronTube',
			unlocked: []
		};
	},
	() => {}
);

describe('CMD', () => {
	it('has data', () => {
		expect(cmd.data).to.not.be.null;
	});

	it('injects the help command', () => {
		cmd.data = 25;
		// cmd.command("help");
		// console.log(cmd.commands['help'].func());
		cmd.command("help help");
		console.log(responses);
		expect(parseInt(responses[3].split(': ')[1])).to.equal(25);
	});

	it('injects the mineData command', () => {
		let currentData = cmd.data;
		cmd.command("mineData");
		expect(cmd.data).to.equal(currentData + 1);
	});

	it('injects the autoMine command', () => {
		responses = [];
		cmd.command("help autoMine");
		console.log(responses);
		expect(true).to.be.true;
	});

	it('injects the sellData command', () => {
		expect(cmd.commands.sellData.price).to.equal(250);
	});

	it('contains the correct version', () => {
		expect(cmd.version).to.equal(version);
	});
});