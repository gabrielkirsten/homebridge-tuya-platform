import BaseAccessory from './BaseAccessory';
export default class DehumidifierAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureCurrentState(): void;
    configureTargetState(): void;
}
//# sourceMappingURL=DehumidifierAccessory.d.ts.map