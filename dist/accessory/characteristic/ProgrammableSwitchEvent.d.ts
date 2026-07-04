import { Service } from 'homebridge';
import { TuyaDeviceSchema, TuyaDeviceStatus } from '../../device/TuyaDevice';
import BaseAccessory from '../BaseAccessory';
export declare function configureProgrammableSwitchEvent(accessory: BaseAccessory, service: Service, schema?: TuyaDeviceSchema): void;
export declare function onProgrammableSwitchEvent(accessory: BaseAccessory, service: Service, status: TuyaDeviceStatus): void;
//# sourceMappingURL=ProgrammableSwitchEvent.d.ts.map