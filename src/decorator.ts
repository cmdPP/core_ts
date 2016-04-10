import { CMD, Command } from './';

export class CommandClass {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	private static makeFunc(): Function {
		return function(target: any, key: string, desc: PropertyDescriptor) {
			let original = desc.value;
			desc.value = function(...args: any[]) {
				return original.apply(CMD.instance, args);
			};
			return desc;
		}
	}

	cls(): Function {
		return (target: any) => {
			let original = target;
			CMD.addCommand(this.name, target);
			return target;
		};
	}

	func(): Function {
		// return function(target: any, key: string, desc: PropertyDescriptor) {
		// 	let original = desc.value;
		// 	desc.value = function(...args: any[]) {
		// 		return original.apply(CMD.instance, args);
		// 	};
		// 	return desc;
		// };
		return CommandClass.makeFunc();
	}

	desc(): Function {
		// return function(target: any, key: string, desc: PropertyDescriptor) {
		// 	let original = desc.value;
		// 	desc.value = function() {
		// 		return original.apply(CMD.instance, []);
		// 	};
		// 	return desc;
		// };
		return CommandClass.makeFunc();
	}

	usage(): Function {
		// return function(target: any, key: string, desc: PropertyDescriptor) {
		// 	let original = desc.value;
		// 	desc.value = function() {
		// 		return original.apply(CMD.instance, []);
		// 	};
		// 	return desc;
		// };
		return CommandClass.makeFunc();
	}
}