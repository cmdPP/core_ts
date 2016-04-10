import { Command } from '../';
export declare class Alias extends Command {
    func(action: string, name: string, command: string): void;
    desc(): string[];
    usage(): string;
}
