import { TuyaDeviceStatus } from '../device/TuyaDevice';
import { TuyaStreamingDelegate } from '../util/TuyaStreamDelegate';
import BaseAccessory from './BaseAccessory';
import { configureLight } from './characteristic/Light';
import { configureOn } from './characteristic/On';
import { configureProgrammableSwitchEvent, onProgrammableSwitchEvent } from './characteristic/ProgrammableSwitchEvent';

const SCHEMA_CODE = {
  MOTION_ON: ['motion_switch'],
  MOTION_DETECT: ['movement_detect_pic'],
  // Indicates that this is possibly a doorbell
  DOORBELL: ['doorbell_ring_exist'],
  // Notifies when a doorbell ring occurs.
  DOORBELL_RING: ['doorbell_pic'],
  // Notifies when a doorbell ring occurs.
  ALARM_MESSAGE: ['alarm_message'],
  LIGHT_ON: ['floodlight_switch'],
  LIGHT_BRIGHT: ['floodlight_lightness'],
};

export default class CameraAccessory extends BaseAccessory {

  private stream: TuyaStreamingDelegate | undefined;

  requiredSchema() {
    return [];
  }

  configureServices() {
    this.configureDoorbell();
    this.configureCamera();
    this.configureMotion();
    this.configureFloodLight();
  }

  configureMotion() {
    const onSchema = this.getSchema(...SCHEMA_CODE.MOTION_ON);
    if (onSchema) {
      const onService = this.accessory.getService(onSchema.code)
        || this.accessory.addService(this.Service.Switch, onSchema.code, onSchema.code);

      configureOn(this, onService, onSchema);
    }

    this.getMotionService().setCharacteristic(this.Characteristic.MotionDetected, false);
  }

  configureDoorbell() {
    const doorbellSchema = this.getSchema(...SCHEMA_CODE.DOORBELL);
    if (!doorbellSchema) {
      return;
    }

    // Prefer dedicated ring event DPs; fall back to doorbell_ring_exist itself (value "1" = ring).
    const schema = this.getSchema(...SCHEMA_CODE.DOORBELL_RING, ...SCHEMA_CODE.ALARM_MESSAGE) ?? doorbellSchema;
    configureProgrammableSwitchEvent(this, this.getDoorbellService(), schema);
  }

  configureCamera() {
    if (this.stream !== undefined) {
      return;
    }

    if (this.device.isVirtualDevice()) {
      return;
    }

    this.stream = new TuyaStreamingDelegate(this);
    this.accessory.configureController(this.stream.controller);
  }

  configureFloodLight() {
    if (!this.getSchema(...SCHEMA_CODE.LIGHT_ON)) {
      return;
    }

    configureLight(
      this,
      this.getLightService(),
      this.getSchema(...SCHEMA_CODE.LIGHT_ON),
      this.getSchema(...SCHEMA_CODE.LIGHT_BRIGHT),
      undefined,
      undefined,
      undefined,
    );
  }

  getLightService() {
    return this.accessory.getService(this.Service.Lightbulb)
      || this.accessory.addService(this.Service.Lightbulb, this.accessory.displayName + ' Floodlight');
  }

  getDoorbellService() {
    return this.accessory.getService(this.Service.Doorbell)
      || this.accessory.addService(this.Service.Doorbell);
  }

  getMotionService() {
    return this.accessory.getService(this.Service.MotionSensor)
      || this.accessory.addService(this.Service.MotionSensor, this.accessory.displayName + ' Motion Detect');
  }

  async onDeviceStatusUpdate(status: TuyaDeviceStatus[]) {
    super.onDeviceStatusUpdate(status);

    const doorbellSchema = this.getSchema(...SCHEMA_CODE.DOORBELL);
    if (doorbellSchema) {
      const doorbellRingSchema = this.getSchema(...SCHEMA_CODE.DOORBELL_RING);
      const alarmMessageSchema = this.getSchema(...SCHEMA_CODE.ALARM_MESSAGE);
      const doorbellRingStatus = doorbellRingSchema && status.find(_status => _status.code === doorbellRingSchema.code);
      const alarmMessageStatus = alarmMessageSchema && status.find(_status => _status.code === alarmMessageSchema.code);
      const doorbellExistStatus = status.find(_status => _status.code === doorbellSchema.code);

      if (doorbellRingStatus && (doorbellRingStatus.value as string).length > 1) { // Compared with '1' in order to filter value '$'
        onProgrammableSwitchEvent(this, this.getDoorbellService(), doorbellRingStatus);
      } else if (alarmMessageStatus && (alarmMessageStatus.value as string).length > 1) {
        onProgrammableSwitchEvent(this, this.getDoorbellService(), alarmMessageStatus);
      } else if (!doorbellRingSchema && !alarmMessageSchema && doorbellExistStatus && doorbellExistStatus.value === '1') {
        // Fallback: use doorbell_ring_exist value "1" as the ring trigger.
        onProgrammableSwitchEvent(this, this.getDoorbellService(), doorbellExistStatus);
      }
    }

    const motionSchema = this.getSchema(...SCHEMA_CODE.MOTION_DETECT);
    if (motionSchema) {
      const motionStatus = status.find(_status => _status.code === motionSchema.code);
      motionStatus && this.onMotionDetected(motionStatus);
    }
  }

  private timer?: NodeJS.Timeout;
  onMotionDetected(status: TuyaDeviceStatus) {
    if (!this.intialized) {
      return;
    }

    const data = Buffer.from(status.value as string, 'base64').toString('binary');
    if (data.length === 0) {
      return;
    }

    this.log.info('Motion event:', data);
    const characteristic = this.getMotionService().getCharacteristic(this.Characteristic.MotionDetected);
    characteristic.updateValue(true);

    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => characteristic.updateValue(false), 30 * 1000);
  }

}
