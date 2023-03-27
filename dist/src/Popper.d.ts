declare const _default: import("vue").DefineComponent<{
    offset: {
        type: ArrayConstructor;
        default: undefined;
    };
    popper: {
        type: ObjectConstructor;
        default: undefined;
    };
    target: {
        type: {
            new (): Element;
            prototype: Element;
        };
        required: true;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    show: BooleanConstructor;
    top: BooleanConstructor;
    bottom: BooleanConstructor;
    left: BooleanConstructor;
    right: BooleanConstructor;
}, unknown, {
    currentShow: boolean;
    popperInstance: null;
}, {
    computedPlacement(): any;
    tooltipClasses(): {
        [x: string]: any;
        show: any;
    };
}, {
    open(): void;
    close(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    offset: {
        type: ArrayConstructor;
        default: undefined;
    };
    popper: {
        type: ObjectConstructor;
        default: undefined;
    };
    target: {
        type: {
            new (): Element;
            prototype: Element;
        };
        required: true;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    show: BooleanConstructor;
    top: BooleanConstructor;
    bottom: BooleanConstructor;
    left: BooleanConstructor;
    right: BooleanConstructor;
}>>, {
    offset: unknown[];
    popper: Record<string, any>;
    title: string;
    show: boolean;
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
}>;
export default _default;
