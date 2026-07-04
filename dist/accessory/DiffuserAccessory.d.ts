import BaseAccessory from './BaseAccessory';
export default class DiffuserAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureDiffuser(): void;
}
//# sourceMappingURL=DiffuserAccessory.d.ts.map