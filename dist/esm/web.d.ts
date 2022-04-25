import { WebPlugin } from "@capacitor/core";
import firebase from "firebase";
import "firebase/remote-config";
import type { FirebaseRemoteConfigPlugin, initOptions, RCReturnData, RCValueOption } from "./definitions";
export declare class FirebaseRemoteConfigWeb extends WebPlugin implements FirebaseRemoteConfigPlugin {
    private remoteConfigRef;
    constructor();
    initializeFirebase(app: firebase.app.App): Promise<void>;
    setDefaultConfig(options: any): Promise<void>;
    initialize(options?: initOptions): Promise<void>;
    fetch(): Promise<void>;
    activate(): Promise<void>;
    fetchAndActivate(): Promise<void>;
    getBoolean(options: RCValueOption): Promise<RCReturnData<boolean>>;
    getNumber(options: RCValueOption): Promise<RCReturnData<number>>;
    getString(options: RCValueOption): Promise<RCReturnData>;
    private getValue;
    get remoteConfig(): firebase.remoteConfig.RemoteConfig;
}
declare const FirebaseRemoteConfig: FirebaseRemoteConfigWeb;
export { FirebaseRemoteConfig };
