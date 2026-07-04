import BaseAccessory from './BaseAccessory';
export default class PetFeederAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("homebridge").Service;
    configureLight(): void;
    configureQuickFeed(): void;
    configureSlowFeed(): void;
    configureManualFeed(): void;
    configureMealPlan(): void;
    configureBatteryPercentage(): void;
    configureFeedReport(): void;
    configureFeedState(): void;
}
//# sourceMappingURL=PetFeederAccessory.d.ts.map