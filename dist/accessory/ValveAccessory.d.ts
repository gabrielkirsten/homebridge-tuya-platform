import { TuyaDeviceSchema } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class ValveAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    configureValve(schema: TuyaDeviceSchema, name: string): void;
}
//# sourceMappingURL=ValveAccessory.d.ts.map