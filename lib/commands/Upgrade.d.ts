import { Command } from '../index';
export declare class Upgrade extends Command {
    func(command: string): void;
    desc(): string[];
    usage(): string;
}
