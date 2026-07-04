import BaseAccessory from './BaseAccessory';
export default class FanAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    fanServiceType(): typeof import("hap-nodejs/dist/lib/definitions").Fan;
    fanService(): import("hap-nodejs").Service;
    lightServiceType(): typeof import("hap-nodejs/dist/lib/definitions").Lightbulb;
    lightService(): import("hap-nodejs").Service;
    getFanSpeedSchema(): import("../device/TuyaDevice").TuyaDeviceSchema | undefined;
    getFanSpeedLevelSchema(): import("../device/TuyaDevice").TuyaDeviceSchema | undefined;
    configureRotationDirection(): void;
}
//# sourceMappingURL=FanAccessory.d.ts.map