import { TuyaDeviceStatus } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class CameraAccessory extends BaseAccessory {
    private stream;
    requiredSchema(): never[];
    configureServices(): void;
    configureMotion(): void;
    configureDoorbell(): void;
    configureCamera(): void;
    configureFloodLight(): void;
    getLightService(): import("hap-nodejs").Service;
    getDoorbellService(): import("hap-nodejs").Service;
    getMotionService(): import("hap-nodejs").Service;
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
    private timer?;
    onMotionDetected(status: TuyaDeviceStatus): void;
}
//# sourceMappingURL=CameraAccessory.d.ts.map