export enum EResetActionType {
    RESET = 'RESET',
}

export interface IResetAction {
    type: EResetActionType.RESET;
}
