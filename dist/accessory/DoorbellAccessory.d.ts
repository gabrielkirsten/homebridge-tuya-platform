import { TuyaDeviceStatus } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class DoorbellAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    getDoorbellService(): import("hap-nodejs").Service;
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
}
//# sourceMappingURL=DoorbellAccessory.d.ts.map