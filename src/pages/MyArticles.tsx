import React, { useCallback } from 'react';
import { Text } from 'components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { IArticleAction } from 'reducers/article/types';
import { Dispatch } from 'redux';
import { EArticleType } from 'reducers/article/actions';
import { IRootState } from 'store';

export const MyArticles = () => {
	const dispatch: Dispatch<IArticleAction> = useDispatch();
	const selector = useSelector((state: IRootState) => state.article);

	const callback = useCallback(() => dispatch({ type: EArticleType.ADD, payload: 'title' }), [dispatch]);

	return (
		<div>
			<Text>{'Какой-то текст'}</Text>
			<Text color='blue'>{'Второй текст'}</Text>
			<Text>{selector.articles.length}</Text>
			<button onClick={callback}>{'Добавить'}</button>
		</div>
	);
};