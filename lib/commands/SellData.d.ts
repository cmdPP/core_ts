import { Command } from '../index';
export declare class SellData extends Command {
    price: number;
    func(amt: string, unit?: string): void;
    desc(): string;
    usage(): string;
}
