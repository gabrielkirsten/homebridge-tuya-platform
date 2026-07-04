import { TuyaDeviceStatus } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class VibrationSensorAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    getMotionService(): import("hap-nodejs").Service;
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
    private timer?;
    onMotionDetected(status: TuyaDeviceStatus): void;
}
//# sourceMappingURL=VibrationSensorAccessory.d.ts.map