/// <reference types="node" />
import EventEmitter from 'events';
import TuyaOpenAPI from '../core/TuyaOpenAPI';
import TuyaOpenMQ from '../core/TuyaOpenMQ';
import Logger from '../util/Logger';
import TuyaDevice, { TuyaDeviceSchema, TuyaDeviceStatus } from './TuyaDevice';
declare enum Events {
    DEVICE_ADD = "DEVICE_ADD",
    DEVICE_INFO_UPDATE = "DEVICE_INFO_UPDATE",
    DEVICE_STATUS_UPDATE = "DEVICE_STATUS_UPDATE",
    DEVICE_DELETE = "DEVICE_DELETE"
}
declare enum TuyaMQTTProtocol {
    DEVICE_STATUS_UPDATE = 4,
    DEVICE_INFO_UPDATE = 20
}
export default class TuyaDeviceManager extends EventEmitter {
    api: TuyaOpenAPI;
    debug: boolean;
    static readonly Events: typeof Events;
    mq: TuyaOpenMQ;
    ownerIDs: string[];
    devices: TuyaDevice[];
    log: Logger;
    constructor(api: TuyaOpenAPI, debug?: boolean);
    getDevice(deviceID: string): TuyaDevice | undefined;
    updateDevices(ownerIDs: []): Promise<TuyaDevice[]>;
    updateDevice(deviceID: string): Promise<TuyaDevice | null>;
    getDeviceInfo(deviceID: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getDeviceListInfo(deviceIDs?: string[]): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getDeviceSchema(deviceID: string): Promise<TuyaDeviceSchema[]>;
    getInfraredRemotes(infraredID: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getInfraredKeys(infraredID: string, remoteID: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getInfraredACStatus(infraredID: string, remoteID: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getInfraredDIYKeys(infraredID: string, remoteID: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    updateInfraredRemotes(allDevices: TuyaDevice[]): Promise<void>;
    sendInfraredCommands(infraredID: string, remoteID: string, category_id: number, remote_index: number, key: string, key_id: number): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    sendInfraredACCommands(infraredID: string, remoteID: string, power: number, mode: number, temp: number, wind: number): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    sendInfraredDIYCommands(infraredID: string, remoteID: string, code: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getLockTemporaryKey(deviceID: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    sendLockCommands(deviceID: string, ticketID: string, open: boolean): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    sendCommands(deviceID: string, commands: TuyaDeviceStatus[]): Promise<any>;
    onMQTTMessage(topic: string, protocol: TuyaMQTTProtocol, message: any): Promise<void>;
}
export {};
//# sourceMappingURL=TuyaDeviceManager.d.ts.map