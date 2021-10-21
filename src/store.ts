import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from 'reducers';

export const store = createStore(reducer, applyMiddleware(thunk));

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export type TGetState = () => TRootState;
