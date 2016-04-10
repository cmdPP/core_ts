export declare class CommandClass {
    name: string;
    constructor(name: string);
    private static makeFunc();
    cls(): Function;
    func(): Function;
    desc(): Function;
    usage(): Function;
}
