import TuyaOpenAPI from '../core/TuyaOpenAPI';
import TuyaDevice from './TuyaDevice';
import TuyaDeviceManager from './TuyaDeviceManager';
export default class TuyaCustomDeviceManager extends TuyaDeviceManager {
    api: TuyaOpenAPI;
    debug: boolean;
    constructor(api: TuyaOpenAPI, debug?: boolean);
    getAssetList(parent_asset_id?: number): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    authorizeAssetList(uid: string, asset_ids?: string[], authorized_children?: boolean): Promise<import("../core/TuyaOpenAPI").TuyaOpenAPIResponse>;
    getAssetDeviceIDList(assetID: string): Promise<string[]>;
    updateDevices(assetIDList: string[]): Promise<TuyaDevice[]>;
}
//# sourceMappingURL=TuyaCustomDeviceManager.d.ts.map