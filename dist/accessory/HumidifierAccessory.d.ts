import BaseAccessory from './BaseAccessory';
export default class HumidifierAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureTargetState(): void;
    configureCurrentState(): void;
    configureRelativeHumidityHumidifierThreshold(): void;
    configureRotationSpeed(): void;
    setSprayModeToHumidity(): Promise<void>;
}
//# sourceMappingURL=HumidifierAccessory.d.ts.map