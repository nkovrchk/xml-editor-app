import { ESortBy, ESortValue } from 'enums';
import { TLimit } from 'types';

export interface IFilterData<T> {
    title: string;
    values: IFilterValue<T>[];
}

export interface IFilterValue<T> {
    title: string;
    value: T;
    isSelected?: boolean;
}

export interface IFilterState {
    limit: IFilterData<TLimit>;
    sortBy: IFilterData<ESortBy>;
    sortValue: IFilterData<ESortValue>;
}
