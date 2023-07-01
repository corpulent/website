declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
  }
}

export interface ReCaptchaInstance {
  ready(callback: () => void): void;
  execute(siteKey: string, options: ExecuteOptions): Promise<string>;
}

export interface ExecuteOptions {
  action: string;
}
