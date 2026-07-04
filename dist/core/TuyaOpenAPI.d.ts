import Logger from '../util/Logger';
declare enum Endpoints {
    AMERICA = "https://openapi.tuyaus.com",
    AMERICA_EAST = "https://openapi-ueaz.tuyaus.com",
    CHINA = "https://openapi.tuyacn.com",
    EUROPE = "https://openapi.tuyaeu.com",
    EUROPE_WEST = "https://openapi-weaz.tuyaeu.com",
    INDIA = "https://openapi.tuyain.com"
}
export declare const LOGIN_ERROR_MESSAGES: {
    1004: string;
    1106: string;
    1114: string;
    2401: string;
    2406: string;
};
type TuyaOpenAPIResponseSuccess = {
    success: true;
    result: any;
    t: number;
    tid: string;
};
type TuyaOpenAPIResponseError = {
    success: false;
    result: unknown;
    code: number;
    msg: string;
    t: number;
    tid: string;
};
export type TuyaOpenAPIResponse = TuyaOpenAPIResponseSuccess | TuyaOpenAPIResponseError;
export default class TuyaOpenAPI {
    endpoint: Endpoints | string;
    accessId: string;
    accessKey: string;
    log: Logger;
    lang: string;
    debug: boolean;
    static readonly Endpoints: typeof Endpoints;
    assetIDArr: Array<string>;
    deviceArr: Array<object>;
    tokenInfo: {
        access_token: string;
        refresh_token: string;
        uid: string;
        expire: number;
    };
    constructor(endpoint: Endpoints | string, accessId: string, accessKey: string, log?: Logger, lang?: string, debug?: boolean);
    static getDefaultEndpoint(countryCode: number): Endpoints;
    isLogin(): boolean;
    isTokenExpired(): boolean;
    isTokenManagementAPI(path: string): boolean;
    _refreshAccessTokenIfNeed(path: string): Promise<void>;
    /**
     * In 'Custom' project, get a token directly. (Login with admin)
     * Have permission on asset management, user management.
     * But lost some permission on device management.
     * @returns
     */
    getToken(): Promise<TuyaOpenAPIResponse>;
    /**
     * In 'Smart Home' project, login with App's user.
     * @param countryCode 2-digit Country Code
     * @param username Username
     * @param password Password
     * @param appSchema App Schema: 'tuyaSmart', 'smartlife'
     * @returns
     */
    homeLogin(countryCode: number, username: string, password: string, appSchema: string): Promise<TuyaOpenAPIResponse>;
    /**
     * In 'Custom' project, Search user by username.
     * @param username Username
     * @returns
     */
    customGetUserInfo(username: string): Promise<TuyaOpenAPIResponse>;
    /**
     * In 'Custom' project, create a user.
     * @param username Username
     * @param password Password
     * @param country_code Country Code (Useless)
     * @returns
     */
    customCreateUser(username: string, password: string, country_code?: number): Promise<TuyaOpenAPIResponse>;
    /**
     * In 'Custom' project, login with user.
     * @param username Username
     * @param password Password
     * @returns
     */
    customLogin(username: string, password: string): Promise<TuyaOpenAPIResponse>;
    request(method: string, path: string, params?: any, body?: any): Promise<TuyaOpenAPIResponse>;
    get(path: string, params?: any): Promise<TuyaOpenAPIResponse>;
    post(path: string, params?: any): Promise<TuyaOpenAPIResponse>;
    delete(path: string, params?: any): Promise<TuyaOpenAPIResponse>;
    _getSign(accessId: string, accessKey: string, accessToken: string | undefined, timestamp: number | undefined, nonce: string, stringToSign: string): string;
    _getStringToSign(method: string, path: string, params: any, body: any): string;
    _getSignUrl(path: string, params: any): string;
    _isSaltedPassword(password: string): boolean;
}
export {};
//# sourceMappingURL=TuyaOpenAPI.d.ts.map