import type { App } from 'vue';
type TooltipPluginOptions = {
    delay?: number;
    prefix: string;
    triggers: {
        open: string[];
        close: string[];
    };
};
export default function (app: App, opts?: Partial<TooltipPluginOptions>): void;
export {};
