import { PlatformAccessory, Service, Characteristic } from 'homebridge';
import { TuyaDeviceSchema, TuyaDeviceStatus } from '../device/TuyaDevice';
import { TuyaPlatform } from '../platform';
import { PrefixLogger } from '../util/Logger';
/**
 * Homebridge Accessory Categories Documentation:
 *   https://developers.homebridge.io/#/categories
 * Tuya Standard Instruction Set Documentation:
 *   https://developer.tuya.com/en/docs/iot/standarddescription?id=K9i5ql6waswzq
 */
declare class BaseAccessory {
    readonly platform: TuyaPlatform;
    readonly accessory: PlatformAccessory;
    readonly Service: typeof Service;
    readonly Characteristic: typeof Characteristic;
    deviceManager: import("../device/TuyaDeviceManager").default;
    device: import("../device/TuyaDevice").default;
    log: PrefixLogger;
    intialized: boolean;
    adaptiveLightingController?: any;
    constructor(platform: TuyaPlatform, accessory: PlatformAccessory);
    addAccessoryInfoService(): void;
    addBatteryService(): void;
    configureStatusActive(): void;
    updateAllValues(): Promise<void>;
    checkOnlineStatus(): void;
    getSchema(...codes: string[]): TuyaDeviceSchema | undefined;
    getStatus(code: string): TuyaDeviceStatus | undefined;
    private sendQueue;
    private debounceSendCommands;
    sendCommands(commands: TuyaDeviceStatus[], debounce?: boolean): Promise<any>;
    checkRequirements(): boolean;
    requiredSchema(): string[][];
    configureServices(): void;
    onDeviceInfoUpdate(info: any): Promise<void>;
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
}
export default class OverridedBaseAccessory extends BaseAccessory {
    private eval;
    private getOverridedSchema;
    getSchema(...codes: string[]): TuyaDeviceSchema | undefined;
    private getOverridedStatus;
    getStatus(code: string): TuyaDeviceStatus | undefined;
    sendCommands(commands: TuyaDeviceStatus[], debounce?: boolean): Promise<void>;
}
export {};
//# sourceMappingURL=BaseAccessory.d.ts.map