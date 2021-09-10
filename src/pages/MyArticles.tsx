import React, { useEffect, useMemo, useState } from 'react';
import { Text } from 'components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { TAppState } from 'store';
import { getArticles } from 'reducers/article/actions';
import { Card } from 'components/Card';

export const MyArticles = () => {
	const dispatch = useDispatch();
	const articleStore = useSelector((state: TAppState) => state.articleStore);

	useEffect(() => {
		dispatch(getArticles());
	}, [dispatch]);

	const cards = useMemo(() => {
		return articleStore.files.length > 0 ? articleStore.files.map(({ title, category , id }) => (
			<Card title={title} category={category} key={id}/>
		)) : null;
	}, [articleStore.files]);

	return (
		<div>
			<Text>{'Какой-то текст'}</Text>
			<Text color='blue'>{'Второй текст'}</Text>
			<div>{cards}</div>
		</div>
	);
};