
import posthog from 'posthog-js'


class AnalyticsTracking {
  //  Hi 
    private production = process.env.NODE_ENV !== "development" ?? true;
    private static _instance: AnalyticsTracking;

    private constructor() {
        //...
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    init() {
      posthog.init(process.env.POSTHOG_KEY ?? "", { api_host: 'https://app.posthog.com' })
    }

    track(text: string, data:Object = {}) {
        if (this.production) {

            posthog.capture(text, data);
           
        }
    }

}

export const analyticsInstance = AnalyticsTracking.Instance;