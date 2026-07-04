import BaseAccessory from './BaseAccessory';
export default class WhiteNoiseLightAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    lightColorSchema(): import("../device/TuyaDevice").TuyaDeviceSchema | undefined;
    lightServiceType(): typeof import("hap-nodejs/dist/lib/definitions").Lightbulb;
    lightService(): import("hap-nodejs").Service;
}
//# sourceMappingURL=WhiteNoiseLightAccessory.d.ts.map