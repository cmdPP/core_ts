import { Command } from '../index';
export declare class SellData extends Command {
    aliases: string[];
    func(cmdName: string): void;
    desc(): string[];
    usage(): string;
}
