import { Service } from 'homebridge';
import { TuyaDeviceStatus } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class DimmerAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    configureBrightness(service: Service, suffix: string): void;
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
}
//# sourceMappingURL=DimmerAccessory.d.ts.map