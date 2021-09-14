import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Grid, GridColumn, GridRow } from 'components/Grid';
import { getArticles, setArticleFilters } from 'reducers/article/actions';
import { TAppState } from 'store';
import { ESortValue } from 'types';

import { ArticlesFilter, IArticlesFilterValue } from './components/ArticlesFilter';
import { ArticleListPageStyled, ListContainer, FiltersContainer, FiltersFooter } from './styled';

export const ArticlesListPage: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const articleStore = useSelector((state: TAppState) => state.articleStore);

    const [filters, setFilters] = useState({ ...articleStore.filters });

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    const redirect = (articleId: string) => {
        history.push(`/articles/${articleId}`);
    };

    const onFilterChange = useCallback(
        (name, value) => setFilters((prevState) => ({ ...prevState, [name]: value })),
        [setFilters],
    );

    const cardsComponent = useMemo(
        () =>
            articleStore.files.length > 0
                ? articleStore.files.map(({ title, category, id }) => (
                      <GridColumn key={id}>
                          <Card
                              title={title}
                              category={category}
                              onClick={() => {
                                  redirect(id);
                              }}
                          />
                      </GridColumn>
                  ))
                : null,
        [articleStore.files],
    );

    const limitInputs: IArticlesFilterValue[] = [
        { label: '20', value: '20' },
        { label: '40', value: '40' },
        { label: '60', value: '60' },
    ];
    const sortByInputs: IArticlesFilterValue[] = [
        { label: 'имя', value: 'title' },
        { label: 'категория', value: 'category' },
        { label: 'идентификатор', value: 'id' },
    ];
    const sortValueInputs: IArticlesFilterValue[] = [
        { label: 'по возрастанию', value: ESortValue.ASC },
        { label: 'по убыванию', value: ESortValue.DESC },
    ];

    const onButtonClick = () => {
        dispatch(setArticleFilters(filters));
        dispatch(getArticles());
    };

    return (
        <ArticleListPageStyled>
            <FiltersContainer>
                <ArticlesFilter
                    title={'Показывать по:'}
                    name={'limit'}
                    inputs={limitInputs}
                    onChange={onFilterChange}
                />
                <ArticlesFilter
                    title={'Сортировать по:'}
                    name={'sortBy'}
                    inputs={sortByInputs}
                    onChange={onFilterChange}
                />
                <ArticlesFilter
                    title={'Сортировка:'}
                    name={'sortValue'}
                    inputs={sortValueInputs}
                    onChange={onFilterChange}
                />
                <FiltersFooter>
                    <Button onClick={onButtonClick}>{'Подтвердить'}</Button>
                </FiltersFooter>
            </FiltersContainer>
            <ListContainer>
                {articleStore.isPending ? (
                    <div>Загрузка...</div>
                ) : (
                    <Grid>
                        <GridRow>{cardsComponent}</GridRow>
                    </Grid>
                )}
            </ListContainer>
        </ArticleListPageStyled>
    );
};
