import type {FC, PropsWithChildren, ReactNode} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullObject = {} & object;

export type BooleanLike = boolean | string | number | null | undefined;

// @ts-ignore
export type IteratorLike = Array<any> | Set<any> | Map<string, any> | NonNullObject;

export type NodeFunction = () => ReactNode;

export type LoopFunction = (item: unknown, key: string, index: number) => ReactNode;

export declare const If: FC<PropsWithChildren<{ check: BooleanLike, then?: NodeFunction }>>;

export declare const Switch: FC<PropsWithChildren<{ match?: BooleanLike, strict?: Boolean }>>;

export declare const Case: FC<PropsWithChildren<{ check: BooleanLike, then?: NodeFunction }>>;

export declare const Default: FC<{ children?: NodeFunction, then?: NodeFunction }>;

export declare const For: FC<PropsWithChildren<{ items: IteratorLike, children?: LoopFunction }>>;
