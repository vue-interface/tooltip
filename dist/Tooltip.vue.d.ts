declare const _sfc_main: {
    mixins: import("vue").DefineComponent<{
        offset: ArrayConstructor;
        popper: ObjectConstructor;
        show: BooleanConstructor;
        target: {
            type: {
                new (): HTMLElement;
                prototype: HTMLElement;
            };
            required: true;
        };
        title: StringConstructor;
        placement: StringConstructor;
        top: BooleanConstructor;
        bottom: BooleanConstructor;
        left: BooleanConstructor;
        right: BooleanConstructor;
    }, unknown, {
        currentShow: boolean;
        popperInstance: null;
    }, {
        computedPlacement(): string;
        tooltipClasses(): {
            [x: string]: boolean;
            show: boolean;
        };
    }, {
        open(): void;
        close(): void;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        offset: ArrayConstructor;
        popper: ObjectConstructor;
        show: BooleanConstructor;
        target: {
            type: {
                new (): HTMLElement;
                prototype: HTMLElement;
            };
            required: true;
        };
        title: StringConstructor;
        placement: StringConstructor;
        top: BooleanConstructor;
        bottom: BooleanConstructor;
        left: BooleanConstructor;
        right: BooleanConstructor;
    }>>, {
        show: boolean;
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    }>[];
};
export default _sfc_main;
