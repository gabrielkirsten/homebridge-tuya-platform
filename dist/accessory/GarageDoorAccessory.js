"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAccessory_1 = __importDefault(require("./BaseAccessory"));
const SCHEMA_CODE = {
    // Physical contact sensor — noisy, used only as onGet fallback.
    CONTACT: ['doorcontact_state'],
    // Control command sent to the gate.
    CONTROL: ['switch_1'],
};
// Custom DP reported by some gate controllers via MQTT but not registered in
// the product's Function Definition (e.g. Izzy Open 2024 / ckmkzq).
// Searched directly in the raw MQTT payload, not via getSchema().
const NOTIFY_CODE = 'notify_portao';
const TRANSITION_TIMEOUT_MS = 60 * 1000;
class GarageDoorAccessory extends BaseAccessory_1.default {
    constructor() {
        super(...arguments);
        this.transitioning = false;
    }
    requiredSchema() {
        return [SCHEMA_CODE.CONTROL];
    }
    configureServices() {
        this.configureCurrentDoorState();
        this.configureTargetDoorState();
    }
    mainService() {
        return this.accessory.getService(this.Service.GarageDoorOpener)
            || this.accessory.addService(this.Service.GarageDoorOpener);
    }
    configureCurrentDoorState() {
        const { OPEN, CLOSED, OPENING, CLOSING, STOPPED } = this.Characteristic.CurrentDoorState;
        this.mainService().getCharacteristic(this.Characteristic.CurrentDoorState)
            .onGet(() => {
            if (this.transitioning) {
                return this.targetOpen ? OPENING : CLOSING;
            }
            // Use contact sensor as fallback (unreliable for push, but ok for polling).
            const contactSchema = this.getSchema(...SCHEMA_CODE.CONTACT);
            if (contactSchema) {
                const status = this.getStatus(contactSchema.code);
                return status.value ? OPEN : CLOSED;
            }
            const controlSchema = this.getSchema(...SCHEMA_CODE.CONTROL);
            if (controlSchema) {
                const status = this.getStatus(controlSchema.code);
                return status.value ? OPEN : CLOSED;
            }
            return STOPPED;
        });
    }
    configureTargetDoorState() {
        const schema = this.getSchema(...SCHEMA_CODE.CONTROL);
        if (!schema) {
            return;
        }
        const { OPEN, CLOSED } = this.Characteristic.TargetDoorState;
        this.mainService().getCharacteristic(this.Characteristic.TargetDoorState)
            .onGet(() => {
            if (this.targetOpen !== undefined) {
                return this.targetOpen ? OPEN : CLOSED;
            }
            const status = this.getStatus(schema.code);
            return status.value ? OPEN : CLOSED;
        })
            .onSet(async (value) => {
            this.targetOpen = (value === OPEN);
            this.setTransitioning(true);
            await this.sendCommands([{ code: schema.code, value: this.targetOpen }]);
        });
    }
    async onDeviceStatusUpdate(status) {
        super.onDeviceStatusUpdate(status);
        // notify_portao is a custom DP not registered in the product schema but
        // present in raw MQTT payloads — search the raw status array directly.
        const notifyStatus = status.find(s => s.code === NOTIFY_CODE);
        if (notifyStatus) {
            this.handleNotify(notifyStatus.value);
            return;
        }
        // doorcontact_state is noisy (sensor bounces on every gate movement).
        // Do NOT push state updates from it — rely only on notify_portao for push,
        // and doorcontact_state via onGet polling as fallback.
    }
    handleNotify(value) {
        const { OPEN, CLOSED } = this.Characteristic.CurrentDoorState;
        const { OPEN: TARGET_OPEN, CLOSED: TARGET_CLOSED } = this.Characteristic.TargetDoorState;
        if (value === 'Portao_1_aberto') {
            this.setTransitioning(false);
            this.targetOpen = true;
            this.mainService().getCharacteristic(this.Characteristic.CurrentDoorState).updateValue(OPEN);
            this.mainService().getCharacteristic(this.Characteristic.TargetDoorState).updateValue(TARGET_OPEN);
        }
        else if (value === 'Portao_1_fechado') {
            this.setTransitioning(false);
            this.targetOpen = false;
            this.mainService().getCharacteristic(this.Characteristic.CurrentDoorState).updateValue(CLOSED);
            this.mainService().getCharacteristic(this.Characteristic.TargetDoorState).updateValue(TARGET_CLOSED);
        }
        else if (value === 'Livre') {
            // Gate finished moving — confirm final state from contact sensor.
            const contactSchema = this.getSchema(...SCHEMA_CODE.CONTACT);
            if (contactSchema) {
                const contactStatus = this.getStatus(contactSchema.code);
                if (contactStatus) {
                    const isOpen = contactStatus.value;
                    this.setTransitioning(false);
                    this.targetOpen = isOpen;
                    this.mainService().getCharacteristic(this.Characteristic.CurrentDoorState).updateValue(isOpen ? OPEN : CLOSED);
                }
            }
        }
    }
    setTransitioning(value) {
        this.transitioning = value;
        this.transitionTimer && clearTimeout(this.transitionTimer);
        if (value) {
            this.transitionTimer = setTimeout(() => {
                this.transitioning = false;
                this.updateAllValues();
            }, TRANSITION_TIMEOUT_MS);
        }
    }
}
exports.default = GarageDoorAccessory;
//# sourceMappingURL=GarageDoorAccessory.js.map