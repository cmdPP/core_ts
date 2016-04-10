import { Command } from '../index';
export declare class BuyData extends Command {
    price: number;
    func(amt: string, unit?: string): void;
    desc(): string;
    usage(): string;
}
