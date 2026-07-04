import BaseAccessory from './BaseAccessory';
export default class ExtractionHoodAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    getFanSpeedSchema(): import("../device/TuyaDevice").TuyaDeviceSchema | undefined;
    getFanSpeedLevelSchema(): import("../device/TuyaDevice").TuyaDeviceSchema | undefined;
    configureCurrentState(): void;
    configureTargetState(): void;
    lightServiceType(): typeof import("hap-nodejs/dist/lib/definitions").Lightbulb;
    lightService(): import("hap-nodejs").Service;
}
//# sourceMappingURL=ExtractionHoodAccessory.d.ts.map