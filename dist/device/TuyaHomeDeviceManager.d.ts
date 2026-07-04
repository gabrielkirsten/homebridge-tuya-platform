import TuyaDevice from './TuyaDevice';
import TuyaDeviceManager from './TuyaDeviceManager';
export default class TuyaHomeDeviceManager extends TuyaDeviceManager {
    getHomeList(): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getHomeDeviceList(homeID: number): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    updateDevices(homeIDList: number[]): Promise<TuyaDevice[]>;
    getSceneList(homeID: number): Promise<TuyaDevice[]>;
    executeScene(homeID: string | number, sceneID: string): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
}
//# sourceMappingURL=TuyaHomeDeviceManager.d.ts.map