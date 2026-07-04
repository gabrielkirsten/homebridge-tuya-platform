import { CameraRecordingConfiguration, CameraRecordingDelegate, HDSProtocolSpecificErrorReason, RecordingPacket } from 'homebridge';
export declare class TuyaRecordingDelegate implements CameraRecordingDelegate {
    updateRecordingActive(active: boolean): void;
    updateRecordingConfiguration(configuration: CameraRecordingConfiguration | undefined): void;
    handleRecordingStreamRequest(streamId: number): AsyncGenerator<RecordingPacket>;
    acknowledgeStream?(streamId: number): void;
    closeRecordingStream(streamId: number, reason: HDSProtocolSpecificErrorReason | undefined): void;
}
//# sourceMappingURL=TuyaRecordingDelegate.d.ts.map