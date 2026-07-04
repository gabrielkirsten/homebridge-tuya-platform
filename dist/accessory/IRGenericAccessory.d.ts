import { TuyaIRRemoteKeyListItem } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class IRGenericAccessory extends BaseAccessory {
    configureServices(): void;
    configureSwitch(key: TuyaIRRemoteKeyListItem): void;
    sendInfraredCommands(key: TuyaIRRemoteKeyListItem): Promise<void>;
}
//# sourceMappingURL=IRGenericAccessory.d.ts.map