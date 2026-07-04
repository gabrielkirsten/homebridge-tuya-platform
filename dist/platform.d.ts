import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import TuyaDevice, { TuyaDeviceStatus } from './device/TuyaDevice';
import TuyaDeviceManager from './device/TuyaDeviceManager';
import { TuyaPlatformConfigOptions } from './config';
import BaseAccessory from './accessory/BaseAccessory';
/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export declare class TuyaPlatform implements DynamicPlatformPlugin {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly Service: typeof Service;
    readonly Characteristic: typeof Characteristic;
    options: TuyaPlatformConfigOptions;
    cachedAccessories: PlatformAccessory[];
    deviceManager?: TuyaDeviceManager;
    accessoryHandlers: BaseAccessory[];
    validate(): boolean;
    validateDeviceOverrides(): boolean;
    validateSchema(): boolean;
    constructor(log: Logger, config: PlatformConfig, api: API);
    /**
     * This function is invoked when homebridge restores cached accessories from disk at startup.
     * It should be used to setup event handlers for characteristics and update respective values.
     */
    configureAccessory(accessory: PlatformAccessory): void;
    /**
     * This is an example method showing how to register discovered accessories.
     * Accessories must only be registered once, previously created accessories
     * must not be registered again to prevent "duplicate UUID" errors.
     */
    initDevices(): Promise<void>;
    getDeviceConfig(device: TuyaDevice): import("./config").TuyaPlatformDeviceConfig | undefined;
    getDeviceSchemaConfig(device: TuyaDevice, code: string): import("./config").TuyaPlatformDeviceSchemaConfig | undefined;
    initCustomProject(): Promise<TuyaDevice[] | undefined>;
    initHomeProject(): Promise<TuyaDevice[] | undefined>;
    addAccessory(device: TuyaDevice): void;
    updateAccessoryInfo(device: TuyaDevice, info: any): void;
    updateAccessoryStatus(device: TuyaDevice, status: TuyaDeviceStatus[]): void;
    removeAccessory(deviceID: string): void;
    getAccessoryHandler(deviceID: string): BaseAccessory | undefined;
}
//# sourceMappingURL=platform.d.ts.map