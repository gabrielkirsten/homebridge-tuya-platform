/// <reference types="node" />
import { StreamRequestCallback, StreamSessionIdentifier } from 'homebridge';
import { Writable } from 'stream';
import { PrefixLogger } from './Logger';
export interface StreamingDelegate {
    stopStream(sessionId: StreamSessionIdentifier): void;
    forceStopStream(sessionId: StreamSessionIdentifier): void;
}
type FfmpegProgress = {
    frame: number;
    fps: number;
    stream_q: number;
    bitrate: number;
    total_size: number;
    out_time_us: number;
    out_time: string;
    dup_frames: number;
    drop_frames: number;
    speed: number;
    progress: string;
};
export declare class FfmpegStreamingProcess {
    private readonly process;
    private killTimeout?;
    readonly stdin: Writable;
    constructor(sessionId: string, videoProcessor: string, ffmpegArgs: string[], log: PrefixLogger, delegate: StreamingDelegate, callback?: StreamRequestCallback);
    parseProgress(data: Uint8Array): FfmpegProgress | undefined;
    getStdin(): Writable;
    stop(): void;
}
export {};
//# sourceMappingURL=FfmpegStreamingProcess.d.ts.map