import type { App } from 'vue';
export default function (app: App, options?: {
    delay: undefined;
    prefix: string;
    triggers: {
        open: string[];
        close: string[];
    };
}): void;
