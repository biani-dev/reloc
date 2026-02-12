import type {FC, ReactNode} from 'react';

export declare module 'reloc' {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type NonNullObject = {} & object;

    type BooleanLike = boolean | string | number | null | undefined;

    // @ts-ignore
    type IteratorLike = Array<any> | Set<any> | Map<string, any> | NonNullObject;

    type NodeFunction = () => ReactNode;

    type LoopFunction = (item: unknown, key: string, index: number) => ReactNode;

    // -------------------------------------------------------------------------
    // <If />
    // -------------------------------------------------------------------------
    interface IfProps {
        is: boolean;
        then?: (value: true) => ReactNode;
        children?: (value: true) => ReactNode;
    }

    export const If: FC<IfProps>;

    // -------------------------------------------------------------------------
    // <Switch />
    // -------------------------------------------------------------------------
    interface SwitchProps {
        match?: any;
        strict?: boolean;
        children: ReactNode;
    }

    export const Switch: FC<SwitchProps>;

    // -------------------------------------------------------------------------
    // <Case />
    // -------------------------------------------------------------------------
    interface CaseProps {
        is: any;
        then?: (value: true) => ReactNode;
        children?: (value: true) => ReactNode;
    }

    export const Case: FC<CaseProps>;

    // -------------------------------------------------------------------------
    // <Default />
    // -------------------------------------------------------------------------
    interface DefaultProps {
        then?: () => ReactNode;
        children?: () => ReactNode;
    }

    export const Default: FC<DefaultProps>;

    // -------------------------------------------------------------------------
    // <For />
    // -------------------------------------------------------------------------
    // Helper type để infer key/index cho các loại collection khác nhau
    type ForRenderFn<T, K = any> = (item: T, key: K, index: number) => ReactNode;

    interface ForArrayProps<T> {
        items: readonly T[];
        children: ForRenderFn<T, number>;
    }

    interface ForSetProps<T> {
        items: Set<T>;
        children: ForRenderFn<T, number>;
    }

    interface ForMapProps<K, V> {
        items: Map<K, V>;
        children: ForRenderFn<V, K>;
    }

    interface ForObjectProps<T extends Record<string | number | symbol, any>> {
        items: T;
        children: ForRenderFn<T[keyof T], keyof T>;
    }

    type ForProps<T> =
        | ForArrayProps<T>
        | ForSetProps<T>
        | ForMapProps<any, T>
        | ForObjectProps<Record<any, T>>;

    // Overload để TypeScript infer tốt hơn
    export function For<T>(props: ForArrayProps<T>): JSX.Element;
    export function For<T>(props: ForSetProps<T>): JSX.Element;
    export function For<K, V>(props: ForMapProps<K, V>): JSX.Element;
    export function For<T extends Record<any, any>>(props: ForObjectProps<T>): JSX.Element;

    // Export chung (fallback)
    export const For: {
        <T>(props: ForProps<T>): JSX.Element;
    };
}