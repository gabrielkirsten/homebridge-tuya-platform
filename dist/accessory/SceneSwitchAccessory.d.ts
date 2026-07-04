import { TuyaDeviceSchema } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class SceneSwitchAccessory extends BaseAccessory {
    configureServices(): void;
    configureSwitch(schema: TuyaDeviceSchema, name: string): void;
}
//# sourceMappingURL=SceneSwitchAccessory.d.ts.map