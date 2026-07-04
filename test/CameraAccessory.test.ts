/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { API, PlatformAccessory } from 'homebridge';
import CameraAccessory from '../src/accessory/CameraAccessory';
import TuyaDevice, { TuyaDeviceSchemaMode, TuyaDeviceSchemaType } from '../src/device/TuyaDevice';
import { TuyaPlatform } from '../src/platform';

const mockConfigurePSE = jest.fn();
const mockOnPSE = jest.fn();
const mockConfigureOn = jest.fn();
const mockConfigureLight = jest.fn();

jest.mock('../src/accessory/characteristic/ProgrammableSwitchEvent', () => ({
  configureProgrammableSwitchEvent: (...args: any[]) => mockConfigurePSE(...args),
  onProgrammableSwitchEvent: (...args: any[]) => mockOnPSE(...args),
}));
jest.mock('../src/accessory/characteristic/On', () => ({
  configureOn: (...args: any[]) => mockConfigureOn(...args),
}));
jest.mock('../src/accessory/characteristic/Light', () => ({
  configureLight: (...args: any[]) => mockConfigureLight(...args),
}));
// Prevent real camera streaming delegate from initialising (requires ffmpeg etc.)
jest.mock('../src/util/TuyaStreamDelegate', () => ({
  TuyaStreamingDelegate: jest.fn(() => ({ controller: {} })),
}));

describe('CameraAccessory', () => {
  let mockPlatform: any;
  let mockDeviceManager: any;

  const ProgrammableSwitchEvent = Object.assign(jest.fn(), { UUID: 'mock-pse-uuid' });
  const MotionDetected = jest.fn();

  beforeEach(() => {
    mockConfigurePSE.mockClear();
    mockOnPSE.mockClear();
    mockConfigureOn.mockClear();
    mockConfigureLight.mockClear();

    mockDeviceManager = {
      getDevice: jest.fn(),
      sendCommands: jest.fn().mockResolvedValue({}),
    };

    const mockHap = {
      Service: {
        Doorbell: jest.fn(),
        MotionSensor: jest.fn(),
        Switch: jest.fn(),
        Lightbulb: jest.fn(),
        AccessoryInformation: jest.fn(),
        Battery: jest.fn(),
      },
      Characteristic: {
        ProgrammableSwitchEvent,
        MotionDetected,
        StatusLowBattery: Object.assign(jest.fn(), { BATTERY_LEVEL_LOW: 1, BATTERY_LEVEL_NORMAL: 0 }),
        Manufacturer: jest.fn(),
        Model: jest.fn(),
        Name: jest.fn(),
        ConfiguredName: jest.fn(),
        SerialNumber: jest.fn(),
      },
    };

    mockPlatform = {
      api: { hap: mockHap },
      log: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
      options: { debug: false, debugLevel: '' },
      deviceManager: mockDeviceManager,
      getDeviceConfig: jest.fn(() => undefined),
      getDeviceSchemaConfig: jest.fn(() => undefined),
    } as unknown as TuyaPlatform;
  });

  function createDevice(schemaCodes: { code: string; type?: TuyaDeviceSchemaType; enumRange?: string[] }[]): TuyaDevice {
    const schema = schemaCodes.map(({ code, type = TuyaDeviceSchemaType.Enum, enumRange = ['0', '1'] }) => ({
      code,
      mode: TuyaDeviceSchemaMode.READ_WRITE,
      type,
      property: type === TuyaDeviceSchemaType.Enum ? { range: enumRange } : {},
    }));

    const status = schemaCodes.map(({ code, type = TuyaDeviceSchemaType.Enum }) => ({
      code,
      value: type === TuyaDeviceSchemaType.Enum ? '0' : false,
    }));

    return new TuyaDevice({
      // Virtual device ID prevents TuyaStreamingDelegate from being created
      id: 'vdevotest123', uuid: 'test-uuid', name: 'Test Camera',
      online: true, owner_id: 'owner-1', product_id: 'sp',
      product_name: 'Smart Camera', category: 'sp', schema, status,
    });
  }

  function createMockAccessory(): any {
    return {
      UUID: 'mock-uuid',
      displayName: 'Test Camera',
      context: { deviceID: 'vdevotest123' },
      services: [],
      getService: jest.fn(() => undefined),
      addService: jest.fn(() => ({
        setCharacteristic: jest.fn().mockReturnThis(),
        getCharacteristic: jest.fn(() => ({
          onGet: jest.fn().mockReturnThis(),
          onSet: jest.fn().mockReturnThis(),
          setProps: jest.fn().mockReturnThis(),
          updateValue: jest.fn().mockReturnThis(),
        })),
        characteristics: [],
      })),
      removeService: jest.fn(),
      configureController: jest.fn(),
    } as unknown as PlatformAccessory;
  }

  function setup(schemaCodes: { code: string; type?: TuyaDeviceSchemaType; enumRange?: string[] }[]) {
    const device = createDevice(schemaCodes);
    mockDeviceManager.getDevice.mockReturnValue(device);
    const mockAccessory = createMockAccessory();
    const camera = new CameraAccessory(mockPlatform, mockAccessory);
    camera.configureServices();
    return { camera, device, mockAccessory };
  }

  // ─── configureDoorbell: schema selection ─────────────────────────────────

  describe('configureDoorbell schema selection', () => {
    test('uses doorbell_pic when present (preferred over doorbell_ring_exist)', () => {
      setup([
        { code: 'doorbell_ring_exist' },
        { code: 'doorbell_pic', type: TuyaDeviceSchemaType.Raw },
      ]);

      expect(mockConfigurePSE).toHaveBeenCalledTimes(1);
      const schemaArg = mockConfigurePSE.mock.calls[0][2];
      expect(schemaArg).toEqual(expect.objectContaining({ code: 'doorbell_pic' }));
    });

    test('falls back to doorbell_ring_exist when doorbell_pic absent', () => {
      setup([{ code: 'doorbell_ring_exist' }]);

      expect(mockConfigurePSE).toHaveBeenCalledTimes(1);
      const schemaArg = mockConfigurePSE.mock.calls[0][2];
      expect(schemaArg).toEqual(expect.objectContaining({ code: 'doorbell_ring_exist' }));
    });

    test('uses alarm_message when doorbell_pic absent but alarm_message present', () => {
      setup([
        { code: 'doorbell_ring_exist' },
        { code: 'alarm_message', type: TuyaDeviceSchemaType.String },
      ]);

      expect(mockConfigurePSE).toHaveBeenCalledTimes(1);
      const schemaArg = mockConfigurePSE.mock.calls[0][2];
      expect(schemaArg).toEqual(expect.objectContaining({ code: 'alarm_message' }));
    });

    test('does not configure doorbell when doorbell_ring_exist absent', () => {
      setup([]);
      expect(mockConfigurePSE).not.toHaveBeenCalled();
    });
  });

  // ─── onDeviceStatusUpdate: doorbell_ring_exist fallback ──────────────────

  describe('onDeviceStatusUpdate doorbell_ring_exist fallback', () => {
    test('doorbell_ring_exist="1" fires event when no doorbell_pic or alarm_message schema', async () => {
      const { camera } = setup([{ code: 'doorbell_ring_exist' }]);
      camera.intialized = true;

      await camera.onDeviceStatusUpdate([{ code: 'doorbell_ring_exist', value: '1' }]);
      expect(mockOnPSE).toHaveBeenCalledTimes(1);
      const statusArg = mockOnPSE.mock.calls[0][2];
      expect(statusArg).toEqual(expect.objectContaining({ code: 'doorbell_ring_exist', value: '1' }));
    });

    test('doorbell_ring_exist="0" does NOT fire event', async () => {
      const { camera } = setup([{ code: 'doorbell_ring_exist' }]);
      camera.intialized = true;

      await camera.onDeviceStatusUpdate([{ code: 'doorbell_ring_exist', value: '0' }]);
      expect(mockOnPSE).not.toHaveBeenCalled();
    });

    test('doorbell_ring_exist="1" does NOT fire via fallback when doorbell_pic is in schema', async () => {
      const { camera } = setup([
        { code: 'doorbell_ring_exist' },
        { code: 'doorbell_pic', type: TuyaDeviceSchemaType.Raw },
      ]);
      camera.intialized = true;

      // doorbell_ring_exist in payload but doorbell_pic is in schema — fallback should NOT trigger
      await camera.onDeviceStatusUpdate([{ code: 'doorbell_ring_exist', value: '1' }]);
      expect(mockOnPSE).not.toHaveBeenCalled();
    });
  });

  // ─── onDeviceStatusUpdate: doorbell_pic primary path ─────────────────────

  describe('onDeviceStatusUpdate doorbell_pic primary path', () => {
    test('doorbell_pic with non-empty value fires event', async () => {
      const { camera } = setup([
        { code: 'doorbell_ring_exist' },
        { code: 'doorbell_pic', type: TuyaDeviceSchemaType.Raw },
      ]);
      camera.intialized = true;

      await camera.onDeviceStatusUpdate([{ code: 'doorbell_pic', value: 'aGVsbG8=' }]);
      expect(mockOnPSE).toHaveBeenCalledTimes(1);
      const statusArg = mockOnPSE.mock.calls[0][2];
      expect(statusArg).toEqual(expect.objectContaining({ code: 'doorbell_pic' }));
    });

    test('doorbell_pic with single-char value ("$") does NOT fire event', async () => {
      const { camera } = setup([
        { code: 'doorbell_ring_exist' },
        { code: 'doorbell_pic', type: TuyaDeviceSchemaType.Raw },
      ]);
      camera.intialized = true;

      await camera.onDeviceStatusUpdate([{ code: 'doorbell_pic', value: '$' }]);
      expect(mockOnPSE).not.toHaveBeenCalled();
    });
  });
});
