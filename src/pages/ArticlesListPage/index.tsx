import React, { useEffect, useMemo } from 'react';

import { Box } from 'components/Box';
import { Grid, GridColumn, GridRow } from 'components/Grid';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';

import { Card } from './components/Card';
import { Filters } from './components/Filters';
import { Pagination } from './components/Pagination';
import { useArticleList } from './store';
import { ArticleListPageStyled } from './styled';

export const ArticlesListPage: React.FC = () => {
    const {
        articleList,
        isPending,
        fetch,
        setPage,
        pagination: { pagesToShow, currentPage },
        filteredArticles,
        isEmpty,
    } = useArticleList();

    const cardsComponent = useMemo(
        () =>
            articleList.length > 0
                ? articleList.map(({ title, category, id }) => (
                      <GridColumn key={id}>
                          <Card title={title} category={category} id={id} />
                      </GridColumn>
                  ))
                : null,
        [articleList],
    );

    useEffect(() => {
        fetch();
    }, [fetch]);

    return (
        <ArticleListPageStyled>
            {isEmpty ? (
                <Text ml={4}>Репозиторий пуст. Создайте новую статью</Text>
            ) : (
                <>
                    <Filters />
                    <Box>{}</Box>
                    <Box flex="1">
                        {isPending ? (
                            <Loader />
                        ) : (
                            <Box>
                                <Text
                                    variant="body1SemiBold"
                                    pl={6}
                                    mb={4}
                                >{`Найдено статей: ${filteredArticles}`}</Text>
                                <Grid>
                                    <GridRow>{cardsComponent}</GridRow>
                                </Grid>
                            </Box>
                        )}
                        {isPending ? null : (
                            <Pagination pages={pagesToShow} currentPage={currentPage} handleChange={setPage} />
                        )}
                    </Box>
                </>
            )}
        </ArticleListPageStyled>
    );
};
