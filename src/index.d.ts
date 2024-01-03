import type {PropsWithChildren, FC, ReactNode} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullObject = {} & object;

export type BooleanLike = boolean | string | number | null | undefined;

// @ts-ignore
export type IteratorLike = Array<any> | Set<any> | Map<string, any> | NonNullObject;

export declare const If: FC<PropsWithChildren<{ check: BooleanLike }>>;

export declare const Switch: FC<PropsWithChildren<{ match?: BooleanLike, strict?: Boolean }>>;
export declare const Case: FC<PropsWithChildren<{ check: BooleanLike}>>;
export declare const Default: FC<{children?: ReactNode | undefined | ((...args: unknown[]) => JSX.Element)}>;

export declare const For: FC<PropsWithChildren<{ items: IteratorLike }>>;
