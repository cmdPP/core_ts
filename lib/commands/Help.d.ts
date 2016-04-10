import { Command } from '../';
export declare class Help extends Command {
    aliases: string[];
    func(subject: string): void;
    desc(): string[];
    usage(): string;
}
