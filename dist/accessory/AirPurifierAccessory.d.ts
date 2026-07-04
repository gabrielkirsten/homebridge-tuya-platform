import BaseAccessory from './BaseAccessory';
export default class AirPurifierAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    getFanSpeedSchema(): import("../device/TuyaDevice").TuyaDeviceSchema | undefined;
    getFanSpeedLevelSchema(): import("../device/TuyaDevice").TuyaDeviceSchema | undefined;
    configureCurrentState(): void;
    configureTargetState(): void;
}
//# sourceMappingURL=AirPurifierAccessory.d.ts.map