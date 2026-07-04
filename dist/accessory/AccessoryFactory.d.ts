import { PlatformAccessory } from 'homebridge';
import TuyaDevice from '../device/TuyaDevice';
import { TuyaPlatform } from '../platform';
import BaseAccessory from './BaseAccessory';
export default class AccessoryFactory {
    static createAccessory(platform: TuyaPlatform, accessory: PlatformAccessory, device: TuyaDevice): BaseAccessory;
}
//# sourceMappingURL=AccessoryFactory.d.ts.map