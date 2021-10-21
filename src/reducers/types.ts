export enum EResetActionType {
    RESET = 'RESET',
}

export interface IResetAction {
    type: EResetActionType.RESET;
}

export type TResetAction = IResetAction;

export type TReducer<E, T> = (state: E, action: T) => E;

export interface IReducer<T, E> {
    (state: T, action: E): typeof state;
}
