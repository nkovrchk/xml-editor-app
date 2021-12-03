import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from 'components/Box';
import { Grid, GridColumn, GridRow } from 'components/Grid';
import { Loader } from 'components/Loader';
import { getArticles } from 'reducers/articles/actions';
import { TRootState } from 'store';

import { Card } from './components/Card';
import { Filters } from './components/Filters';
import { ArticleListPageStyled } from './styled';

export const ArticlesListPage: React.FC = () => {
    const dispatch = useDispatch();

    const articleStore = useSelector((state: TRootState) => state.articles);

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    const cardsComponent = useMemo(
        () =>
            articleStore.files.length > 0
                ? articleStore.files.map(({ title, category, id }) => (
                      <GridColumn key={id}>
                          <Card title={title} category={category} id={id} />
                      </GridColumn>
                  ))
                : null,
        [articleStore.files],
    );

    return (
        <ArticleListPageStyled>
            <Filters />
            <Box flex="1">
                {articleStore.isPending ? (
                    <Loader />
                ) : (
                    <Grid>
                        <GridRow>{cardsComponent}</GridRow>
                    </Grid>
                )}
            </Box>
        </ArticleListPageStyled>
    );
};
