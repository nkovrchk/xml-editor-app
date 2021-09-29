const ARTICLE = '/articles/';

export const ROUTES = {
    ROOT: {
        PATH: '/',
        TITLE: 'Мои статьи',
    },
    CREATE_ARTICLE: {
        PATH: '/create-article',
        TITLE: 'Создать статью',
    },
    ARTICLE_EDITOR: {
        PATH: '/articles/:articleId',
        ROUTE: ARTICLE,
        TITLE: 'Редактировать',
    },
};
