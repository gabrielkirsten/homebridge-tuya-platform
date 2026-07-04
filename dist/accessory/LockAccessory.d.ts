import BaseAccessory from './BaseAccessory';
export default class LockAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureLockCurrentState(): void;
    configureLockTargetState(): void;
}
//# sourceMappingURL=LockAccessory.d.ts.map