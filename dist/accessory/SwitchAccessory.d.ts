import { TuyaDeviceSchema } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class SwitchAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): typeof import("hap-nodejs/dist/lib/definitions").Switch;
    configureSwitch(schema: TuyaDeviceSchema, name: string): void;
    configureInching(): void;
}
//# sourceMappingURL=SwitchAccessory.d.ts.map