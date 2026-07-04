import { TuyaDeviceStatus } from '../device/TuyaDevice';
import BaseAccessory from './BaseAccessory';
export default class GarageDoorAccessory extends BaseAccessory {
    private targetOpen;
    private transitioning;
    private transitionTimer?;
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureCurrentDoorState(): void;
    configureTargetDoorState(): void;
    onDeviceStatusUpdate(status: TuyaDeviceStatus[]): Promise<void>;
    private handleNotify;
    private setTransitioning;
}
//# sourceMappingURL=GarageDoorAccessory.d.ts.map