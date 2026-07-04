export declare enum TuyaDeviceSchemaMode {
    UNKNOWN = "",
    READ_WRITE = "rw",
    READ_ONLY = "ro",
    WRITE_ONLY = "wo"
}
export declare enum TuyaDeviceSchemaType {
    Boolean = "Boolean",
    Integer = "Integer",
    Enum = "Enum",
    String = "String",
    Json = "Json",
    Raw = "Raw"
}
export type TuyaDeviceSchemaIntegerProperty = {
    min: number;
    max: number;
    scale: number;
    step: number;
    unit: string;
};
export type TuyaDeviceSchemaEnumProperty = {
    range: string[];
};
export type TuyaDeviceSchemaStringProperty = string;
export type TuyaDeviceSchemaJSONProperty = object;
export type TuyaDeviceSchemaProperty = TuyaDeviceSchemaIntegerProperty | TuyaDeviceSchemaEnumProperty | TuyaDeviceSchemaStringProperty | TuyaDeviceSchemaJSONProperty;
export type TuyaDeviceSchema = {
    code: string;
    mode: TuyaDeviceSchemaMode;
    type: TuyaDeviceSchemaType;
    property: TuyaDeviceSchemaProperty;
};
export type TuyaDeviceStatus = {
    code: string;
    value: string | number | boolean;
};
export type TuyaIRRemoteKeyListItem = {
    key: string;
    key_id: number;
    key_name: string;
    standard_key: boolean;
    learning_code?: string;
};
export type TuyaIRRemoteTempListItem = {
    temp: number;
    temp_name: string;
    fan_list: TuyaIRRemoteFanListItem[];
};
export type TuyaIRRemoteKeyRangeItem = {
    mode: number;
    mode_name: string;
    temp_list: TuyaIRRemoteTempListItem[];
};
export type TuyaIRRemoteFanListItem = {
    fan: number;
    fan_name: string;
};
export type TuyaIRRemoteKeys = {
    category_id: number;
    brand_id: number;
    remote_index: number;
    single_air: boolean;
    duplicate_power: boolean;
    key_list: TuyaIRRemoteKeyListItem[];
    key_range: TuyaIRRemoteKeyRangeItem[];
};
export default class TuyaDevice {
    id: string;
    uuid: string;
    name: string;
    online: boolean;
    owner_id: string;
    product_id: string;
    product_name: string;
    icon: string;
    category: string;
    unbridged?: boolean;
    schema: TuyaDeviceSchema[];
    status: TuyaDeviceStatus[];
    ip: string;
    lat: string;
    lon: string;
    time_zone: string;
    create_time: number;
    active_time: number;
    update_time: number;
    sub: boolean;
    parent_id?: string;
    remote_keys?: TuyaIRRemoteKeys;
    constructor(obj: Partial<TuyaDevice>);
    isVirtualDevice(): boolean;
    isIRControlHub(): boolean;
    isIRRemoteControl(): boolean;
}
//# sourceMappingURL=TuyaDevice.d.ts.map