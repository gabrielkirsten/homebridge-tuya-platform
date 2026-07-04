import { CameraController, CameraStreamingDelegate, PrepareStreamCallback, PrepareStreamRequest, SnapshotRequest, SnapshotRequestCallback, StreamingRequest, StreamRequestCallback } from 'homebridge';
import CameraAccessory from '../accessory/CameraAccessory';
import { StreamingDelegate as FfmpegStreamingDelegate } from './FfmpegStreamingProcess';
export declare class TuyaStreamingDelegate implements CameraStreamingDelegate, FfmpegStreamingDelegate {
    readonly controller: CameraController;
    private pendingSessions;
    private ongoingSessions;
    private readonly camera;
    private readonly hap;
    constructor(camera: CameraAccessory);
    stopStream(sessionId: string): void;
    forceStopStream(sessionId: string): void;
    handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): Promise<void>;
    prepareStream(request: PrepareStreamRequest, callback: PrepareStreamCallback): Promise<void>;
    handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): Promise<void>;
    private retrieveDeviceRTSP;
    private startStream;
    private fetchSnapshot;
}
//# sourceMappingURL=TuyaStreamDelegate.d.ts.map