import { TuyaDeviceSchema, TuyaDeviceStatus } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class SwitchAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    configureSwitch(schema: TuyaDeviceSchema, name: string): void;
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
}
//# sourceMappingURL=WirelessSwitchAccessory.d.ts.map