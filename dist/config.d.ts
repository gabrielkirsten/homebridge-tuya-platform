import { PlatformConfig } from 'homebridge';
import { TuyaDeviceSchemaProperty, TuyaDeviceSchemaType } from './device/TuyaDevice';
export interface TuyaPlatformDeviceSchemaConfig {
    code: string;
    newCode?: string;
    type?: TuyaDeviceSchemaType;
    property?: TuyaDeviceSchemaProperty;
    onGet?: string;
    onSet?: string;
    hidden?: boolean;
}
export interface TuyaPlatformDeviceConfig {
    id: string;
    category?: string;
    schema?: Array<TuyaPlatformDeviceSchemaConfig>;
    unbridged?: boolean;
    adaptiveLighting?: boolean;
}
export interface TuyaPlatformCustomConfigOptions {
    projectType: '1';
    endpoint: string;
    accessId: string;
    accessKey: string;
    username: string;
    password: string;
    deviceOverrides?: Array<TuyaPlatformDeviceConfig>;
    debug?: boolean;
    debugLevel?: string;
}
export interface TuyaPlatformHomeConfigOptions {
    projectType: '2';
    endpoint?: string;
    accessId: string;
    accessKey: string;
    countryCode: number;
    username: string;
    password: string;
    appSchema: string;
    homeWhitelist?: Array<number>;
    deviceOverrides?: Array<TuyaPlatformDeviceConfig>;
    debug?: boolean;
    debugLevel?: string;
}
export type TuyaPlatformConfigOptions = TuyaPlatformCustomConfigOptions | TuyaPlatformHomeConfigOptions;
export interface TuyaPlatformConfig extends PlatformConfig {
    options: TuyaPlatformConfigOptions;
}
export declare const customOptionsSchema: {
    properties: {
        endpoint: {
            type: string;
            format: string;
            required: boolean;
        };
        accessId: {
            type: string;
            required: boolean;
        };
        accessKey: {
            type: string;
            required: boolean;
        };
        deviceOverrides: {
            type: string;
        };
        debug: {
            type: string;
        };
        debugLevel: {
            type: string;
        };
    };
};
export declare const homeOptionsSchema: {
    properties: {
        accessId: {
            type: string;
            required: boolean;
        };
        accessKey: {
            type: string;
            required: boolean;
        };
        endpoint: {
            type: string;
            format: string;
        };
        countryCode: {
            type: string;
            minimum: number;
            required: boolean;
        };
        username: {
            type: string;
            required: boolean;
        };
        password: {
            type: string;
            required: boolean;
        };
        appSchema: {
            type: string;
            required: boolean;
        };
        homeWhitelist: {
            type: string;
        };
        deviceOverrides: {
            type: string;
        };
        debug: {
            type: string;
        };
        debugLevel: {
            type: string;
        };
    };
};
//# sourceMappingURL=config.d.ts.map