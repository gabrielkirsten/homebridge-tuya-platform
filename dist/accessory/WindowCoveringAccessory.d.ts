import BaseAccessory from './BaseAccessory';
export default class WindowCoveringAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    configureCurrentPosition(i: number): void;
    configurePositionState(i: number): void;
    configureTargetPositionPercent(i: number): void;
    configureTargetPositionControl(i: number): void;
}
//# sourceMappingURL=WindowCoveringAccessory.d.ts.map