import { Command } from '../index';
export declare class Help extends Command {
    aliases: string[];
    func(subject: string): void;
    desc(): string[];
    usage(): string;
}
