import { Command } from '../index';
export declare class AutoMine extends Command {
    price: number;
    func(action: string): void;
    desc(): string;
    usage(): string;
}
