/// <reference types="node" />
/// <reference types="node" />
import mqtt from 'mqtt';
import TuyaOpenAPI from './TuyaOpenAPI';
import Logger from '../util/Logger';
interface TuyaMQTTConfigSourceTopic {
    device: string;
}
interface TuyaMQTTConfig {
    url: string;
    client_id: string;
    username: string;
    password: string;
    expire_time: number;
    source_topic: TuyaMQTTConfigSourceTopic;
    sink_topic: object;
}
type TuyaMQTTCallback = (topic: string, protocol: number, data: any) => void;
export default class TuyaOpenMQ {
    api: TuyaOpenAPI;
    log: Logger;
    debug: boolean;
    client?: mqtt.MqttClient;
    config?: TuyaMQTTConfig;
    version: string;
    messageListeners: Set<TuyaMQTTCallback>;
    linkId: string;
    timer?: NodeJS.Timer;
    constructor(api: TuyaOpenAPI, log?: Logger, debug?: boolean);
    start(): void;
    stop(): void;
    _connect(): Promise<void>;
    _getMQConfig(linkType: string): Promise<import("./TuyaOpenAPI").TuyaOpenAPIResponse>;
    _onConnect(): void;
    _onError(error: Error): void;
    _onEnd(): void;
    _onMessage(topic: string, payload: Buffer): Promise<void>;
    private consumedQueue;
    _fixWrongOrderMessage(protocol: number, message: any, t: number): void;
    _decodeMQMessage_1_0(b64msg: string, password: string): string;
    _decodeMQMessage_2_0(data: string, password: string, t: number): string;
    _decodeMQMessage(data: string, password: string, t: number): string;
    addMessageListener(listener: TuyaMQTTCallback): void;
    removeMessageListener(listener: TuyaMQTTCallback): void;
}
export {};
//# sourceMappingURL=TuyaOpenMQ.d.ts.map