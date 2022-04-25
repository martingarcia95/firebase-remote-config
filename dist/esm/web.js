import { registerPlugin, WebPlugin } from "@capacitor/core";
import "firebase/remote-config";
// Errors
const ErrRemoteConfigNotInitialiazed = new Error("Remote config is not initialized. Make sure initialize() is called first.");
const ErrMissingDefaultConfig = new Error("No default configuration found");
export class FirebaseRemoteConfigWeb extends WebPlugin {
    constructor() {
        super();
    }
    async initializeFirebase(app) {
        this.remoteConfigRef = app.remoteConfig();
    }
    async setDefaultConfig(options) {
        if (!options)
            throw ErrMissingDefaultConfig;
        if (!this.remoteConfigRef)
            throw ErrRemoteConfigNotInitialiazed;
        this.remoteConfigRef.defaultConfig = options;
        return;
    }
    async initialize(options) {
        if (!this.remoteConfigRef)
            throw ErrRemoteConfigNotInitialiazed;
        this.remoteConfigRef.settings = Object.assign({ minimumFetchIntervalMillis: 1000 * 60 * 60 * 12, fetchTimeoutMillis: 1 * 60000 }, options);
        return;
    }
    async fetch() {
        if (!this.remoteConfigRef)
            throw ErrRemoteConfigNotInitialiazed;
        const data = await this.remoteConfigRef.fetch();
        return data;
    }
    async activate() {
        if (!this.remoteConfigRef)
            throw ErrRemoteConfigNotInitialiazed;
        await this.remoteConfigRef.activate();
        return;
    }
    async fetchAndActivate() {
        if (!this.remoteConfigRef)
            throw ErrRemoteConfigNotInitialiazed;
        await this.remoteConfigRef.fetchAndActivate();
        return;
    }
    getBoolean(options) {
        return this.getValue(options, "Boolean");
    }
    getNumber(options) {
        return this.getValue(options, "Number");
    }
    getString(options) {
        return this.getValue(options, "String");
    }
    async getValue(options, format = "String") {
        if (!this.remoteConfigRef)
            throw new Error("Remote config is not initialized. Make sure initialize() is called at first.");
        const retVal = this.remoteConfigRef.getValue(options.key);
        return {
            key: options.key,
            value: retVal[`as${format}`](),
            source: retVal.getSource(),
        };
    }
    get remoteConfig() {
        return this.remoteConfigRef;
    }
}
const FirebaseRemoteConfig = registerPlugin("FirebaseRemoteConfig", {
    web: () => new FirebaseRemoteConfigWeb(),
});
export { FirebaseRemoteConfig };
//# sourceMappingURL=web.js.map