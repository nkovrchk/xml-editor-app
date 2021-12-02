import { http } from 'net/http';

import { IClassifierPostResponse } from './types';

export const ClassifierApi = {
    predict: (text: string): Promise<IClassifierPostResponse> => {
        return http.post('classifier', { text }).then(({ data }) => data);
    },
};
