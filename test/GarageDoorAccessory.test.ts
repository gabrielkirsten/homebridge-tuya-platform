/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { API, PlatformAccessory } from 'homebridge';
import GarageDoorAccessory from '../src/accessory/GarageDoorAccessory';
import TuyaDevice, { TuyaDeviceSchemaMode, TuyaDeviceSchemaType } from '../src/device/TuyaDevice';
import { TuyaPlatform } from '../src/platform';

// HAP CurrentDoorState enum values
const DOOR_OPEN = 0;
const DOOR_CLOSED = 1;
const DOOR_OPENING = 2;
const DOOR_CLOSING = 3;
const DOOR_STOPPED = 4;

// HAP TargetDoorState enum values
const TARGET_OPEN = 0;
const TARGET_CLOSED = 1;

describe('GarageDoorAccessory', () => {
  // Stable mock Characteristic constructors with enum properties
  const CurrentDoorState = Object.assign(jest.fn(), {
    OPEN: DOOR_OPEN, CLOSED: DOOR_CLOSED, OPENING: DOOR_OPENING, CLOSING: DOOR_CLOSING, STOPPED: DOOR_STOPPED,
  });
  const TargetDoorState = Object.assign(jest.fn(), {
    OPEN: TARGET_OPEN, CLOSED: TARGET_CLOSED,
  });
  const ProgrammableSwitchEvent = Object.assign(jest.fn(), { UUID: 'mock-pse-uuid' });

  let mockPlatform: any;
  let mockDeviceManager: any;
  let mockGarageService: any;
  let mockCurrentDoorChar: any;
  let mockTargetDoorChar: any;

  beforeEach(() => {
    mockCurrentDoorChar = {
      onGet: jest.fn().mockReturnThis(),
      onSet: jest.fn().mockReturnThis(),
      updateValue: jest.fn().mockReturnThis(),
      value: DOOR_CLOSED,
    };

    mockTargetDoorChar = {
      onGet: jest.fn().mockReturnThis(),
      onSet: jest.fn().mockReturnThis(),
      updateValue: jest.fn().mockReturnThis(),
      value: TARGET_CLOSED,
    };

    mockGarageService = {
      getCharacteristic: jest.fn((charType: any) => {
        if (charType === CurrentDoorState) return mockCurrentDoorChar;
        if (charType === TargetDoorState) return mockTargetDoorChar;
        return { onGet: jest.fn().mockReturnThis(), onSet: jest.fn().mockReturnThis(), updateValue: jest.fn().mockReturnThis() };
      }),
      setCharacteristic: jest.fn().mockReturnThis(),
      characteristics: [],
    };

    mockDeviceManager = {
      getDevice: jest.fn(),
      sendCommands: jest.fn().mockResolvedValue({}),
    };

    const mockHap = {
      Service: {
        GarageDoorOpener: jest.fn(),
        AccessoryInformation: jest.fn(),
        Battery: jest.fn(),
      },
      Characteristic: {
        CurrentDoorState,
        TargetDoorState,
        ProgrammableSwitchEvent,
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

  function createDevice(options: { contactValue?: boolean } = {}): TuyaDevice {
    const schema: any[] = [
      { code: 'switch_1', mode: TuyaDeviceSchemaMode.READ_WRITE, type: TuyaDeviceSchemaType.Boolean, property: {} },
    ];
    const status: any[] = [
      { code: 'switch_1', value: false },
    ];

    if (options.contactValue !== undefined) {
      schema.push({ code: 'doorcontact_state', mode: TuyaDeviceSchemaMode.READ_ONLY, type: TuyaDeviceSchemaType.Boolean, property: {} });
      status.push({ code: 'doorcontact_state', value: options.contactValue });
    }

    return new TuyaDevice({
      id: 'test-gate-id', uuid: 'test-uuid', name: 'Test Gate',
      online: true, owner_id: 'owner-1', product_id: 'ckmkzq',
      product_name: 'Gate', category: 'ckmkzq', schema, status,
    });
  }

  function createMockAccessory(): any {
    return {
      UUID: 'mock-uuid',
      displayName: 'Test Gate',
      context: { deviceID: 'test-gate-id' },
      services: [],
      getService: jest.fn(() => undefined),
      addService: jest.fn(() => ({
        setCharacteristic: jest.fn().mockReturnThis(),
        getCharacteristic: jest.fn(() => ({
          onGet: jest.fn().mockReturnThis(),
          onSet: jest.fn().mockReturnThis(),
          updateValue: jest.fn().mockReturnThis(),
        })),
        characteristics: [],
      })),
      removeService: jest.fn(),
    } as unknown as PlatformAccessory;
  }

  function setup(options: { contactValue?: boolean } = {}) {
    const device = createDevice(options);
    mockDeviceManager.getDevice.mockReturnValue(device);
    const mockAccessory = createMockAccessory();

    const garage = new GarageDoorAccessory(mockPlatform, mockAccessory);
    // Override mainService so all calls return our controlled mock with trackable characteristics
    (garage as any).mainService = jest.fn(() => mockGarageService);
    garage.configureServices();
    return { garage, device };
  }

  // ─── notify_portao state push ─────────────────────────────────────────────

  describe('notify_portao → authoritative state push', () => {
    test('Portao_1_aberto pushes OPEN to CurrentDoorState and TargetDoorState', async () => {
      const { garage } = setup();
      await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Portao_1_aberto' }]);
      expect(mockCurrentDoorChar.updateValue).toHaveBeenCalledWith(DOOR_OPEN);
      expect(mockTargetDoorChar.updateValue).toHaveBeenCalledWith(TARGET_OPEN);
    });

    test('Portao_1_fechado pushes CLOSED to CurrentDoorState and TargetDoorState', async () => {
      const { garage } = setup();
      await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Portao_1_fechado' }]);
      expect(mockCurrentDoorChar.updateValue).toHaveBeenCalledWith(DOOR_CLOSED);
      expect(mockTargetDoorChar.updateValue).toHaveBeenCalledWith(TARGET_CLOSED);
    });

    test('Livre with doorcontact_state=true pushes OPEN', async () => {
      const { garage } = setup({ contactValue: true });
      await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Livre' }]);
      expect(mockCurrentDoorChar.updateValue).toHaveBeenCalledWith(DOOR_OPEN);
    });

    test('Livre with doorcontact_state=false pushes CLOSED', async () => {
      const { garage } = setup({ contactValue: false });
      await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Livre' }]);
      expect(mockCurrentDoorChar.updateValue).toHaveBeenCalledWith(DOOR_CLOSED);
    });

    test('notify_portao clears transitioning flag', async () => {
      const { garage } = setup();
      (garage as any).transitioning = true;
      await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Portao_1_aberto' }]);
      expect((garage as any).transitioning).toBe(false);
    });

    test('notify_portao sets targetOpen=true on open', async () => {
      const { garage } = setup();
      await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Portao_1_aberto' }]);
      expect((garage as any).targetOpen).toBe(true);
    });

    test('notify_portao sets targetOpen=false on close', async () => {
      const { garage } = setup();
      await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Portao_1_fechado' }]);
      expect((garage as any).targetOpen).toBe(false);
    });
  });

  // ─── doorcontact_state: no direct push ───────────────────────────────────

  describe('doorcontact_state alone does NOT push state', () => {
    test('doorcontact_state-only update does not call updateValue via handleNotify', async () => {
      const { garage } = setup({ contactValue: true });
      // Only doorcontact_state — no notify_portao
      await garage.onDeviceStatusUpdate([{ code: 'doorcontact_state', value: false }]);
      // updateAllValues runs (via super) but garage service is not in mockAccessory.services,
      // so handleNotify is the only source of direct updateValue calls
      expect(mockCurrentDoorChar.updateValue).not.toHaveBeenCalled();
      expect(mockTargetDoorChar.updateValue).not.toHaveBeenCalled();
    });

    test('switch_1-only update does not push state', async () => {
      const { garage } = setup();
      await garage.onDeviceStatusUpdate([{ code: 'switch_1', value: true }]);
      expect(mockCurrentDoorChar.updateValue).not.toHaveBeenCalled();
      expect(mockTargetDoorChar.updateValue).not.toHaveBeenCalled();
    });
  });

  // ─── onSet: transitioning tracking ───────────────────────────────────────

  describe('onSet sets transitioning state', () => {
    test('onSet(OPEN) sets transitioning=true and targetOpen=true', async () => {
      const { garage } = setup();
      const onSetCallback = mockTargetDoorChar.onSet.mock.calls[0]?.[0] as Function;
      expect(onSetCallback).toBeDefined();

      await onSetCallback(TARGET_OPEN);
      expect((garage as any).targetOpen).toBe(true);
      expect((garage as any).transitioning).toBe(true);
    });

    test('onSet(CLOSED) sets transitioning=true and targetOpen=false', async () => {
      const { garage } = setup();
      const onSetCallback = mockTargetDoorChar.onSet.mock.calls[0]?.[0] as Function;

      await onSetCallback(TARGET_CLOSED);
      expect((garage as any).targetOpen).toBe(false);
      expect((garage as any).transitioning).toBe(true);
    });

    test('onSet sends command to device', async () => {
      const { garage, device } = setup();
      const onSetCallback = mockTargetDoorChar.onSet.mock.calls[0]?.[0] as Function;

      await onSetCallback(TARGET_OPEN);
      expect(mockDeviceManager.sendCommands).toHaveBeenCalledWith(
        device.id,
        expect.arrayContaining([expect.objectContaining({ code: 'switch_1', value: true })]),
      );
    });
  });

  // ─── onGet: transitioning state reflected ────────────────────────────────

  describe('onGet returns transitioning state', () => {
    test('returns OPENING when transitioning with targetOpen=true', async () => {
      const { garage } = setup();
      (garage as any).transitioning = true;
      (garage as any).targetOpen = true;

      const onGetCallback = mockCurrentDoorChar.onGet.mock.calls[0]?.[0] as Function;
      const result = await onGetCallback();
      expect(result).toBe(DOOR_OPENING);
    });

    test('returns CLOSING when transitioning with targetOpen=false', async () => {
      const { garage } = setup();
      (garage as any).transitioning = true;
      (garage as any).targetOpen = false;

      const onGetCallback = mockCurrentDoorChar.onGet.mock.calls[0]?.[0] as Function;
      const result = await onGetCallback();
      expect(result).toBe(DOOR_CLOSING);
    });

    test('returns OPEN from doorcontact_state=true when not transitioning', async () => {
      const { garage } = setup({ contactValue: true });
      (garage as any).transitioning = false;

      const onGetCallback = mockCurrentDoorChar.onGet.mock.calls[0]?.[0] as Function;
      const result = await onGetCallback();
      expect(result).toBe(DOOR_OPEN);
    });

    test('returns CLOSED from doorcontact_state=false when not transitioning', async () => {
      const { garage } = setup({ contactValue: false });
      (garage as any).transitioning = false;

      const onGetCallback = mockCurrentDoorChar.onGet.mock.calls[0]?.[0] as Function;
      const result = await onGetCallback();
      expect(result).toBe(DOOR_CLOSED);
    });
  });

  // ─── transition timeout ───────────────────────────────────────────────────

  describe('transition timeout', () => {
    test('transitioning is cleared after 60s safety timeout', async () => {
      jest.useFakeTimers();
      try {
        const { garage } = setup();
        const onSetCallback = mockTargetDoorChar.onSet.mock.calls[0]?.[0] as Function;
        await onSetCallback(TARGET_OPEN);

        expect((garage as any).transitioning).toBe(true);
        jest.advanceTimersByTime(60 * 1000);
        expect((garage as any).transitioning).toBe(false);
      } finally {
        jest.useRealTimers();
      }
    });

    test('notify_portao before timeout cancels the timer', async () => {
      jest.useFakeTimers();
      try {
        const { garage } = setup();
        const onSetCallback = mockTargetDoorChar.onSet.mock.calls[0]?.[0] as Function;
        await onSetCallback(TARGET_OPEN);

        // notify_portao arrives before timeout — resolves transition
        mockCurrentDoorChar.updateValue.mockClear();
        mockTargetDoorChar.updateValue.mockClear();
        await garage.onDeviceStatusUpdate([{ code: 'notify_portao', value: 'Portao_1_aberto' }]);
        expect((garage as any).transitioning).toBe(false);

        // Advancing past the timeout should NOT re-trigger updateValue calls
        mockCurrentDoorChar.updateValue.mockClear();
        mockTargetDoorChar.updateValue.mockClear();
        jest.advanceTimersByTime(60 * 1000);
        expect(mockCurrentDoorChar.updateValue).not.toHaveBeenCalled();
      } finally {
        jest.useRealTimers();
      }
    });
  });
});
