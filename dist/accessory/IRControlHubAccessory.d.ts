import { TuyaDeviceStatus } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class IRControlHubAccessory extends BaseAccessory {
    requiredSchema(): never[];
    configureServices(): void;
    getSubAccessories(): BaseAccessory[];
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
}
//# sourceMappingURL=IRControlHubAccessory.d.ts.map