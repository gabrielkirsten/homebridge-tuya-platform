import BaseAccessory from './BaseAccessory';
export default class IRAirConditionerAccessory extends BaseAccessory {
    configureServices(): void;
    configureAirConditioner(): void;
    configureDehumidifier(): void;
    configureFan(): void;
    mainService(): import("hap-nodejs").Service;
    dehumidifierService(): import("hap-nodejs").Service;
    fanService(): import("hap-nodejs").Service;
    getPower(): 0 | 1;
    setPower(value: any): void;
    getMode(): number;
    setMode(value: any): void;
    getWind(): number;
    setWind(value: any): void;
    getTemp(): number;
    setTemp(value: any): void;
    getKeyRangeItem(mode: number): import("../device/TuyaDevice").TuyaIRRemoteKeyRangeItem | undefined;
    supportDehumidifier(): boolean;
    supportFan(): boolean;
    getTempRange(mode: number): number[] | undefined;
    getParentAccessory(): BaseAccessory;
    configureTargetState(): void;
    configureCurrentTemperature(): void;
    configureTargetFanState(service: any): void;
    configureRotationSpeed(service: any): void;
    debounceSendACCommands: (() => Promise<void>) & {
        clear(): void;
    } & {
        flush(): void;
    };
    sendACCommands(): Promise<void>;
}
//# sourceMappingURL=IRAirConditionerAccessory.d.ts.map