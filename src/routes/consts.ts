const ARTICLE = '/articles/';

export const ROUTES = {
    ROOT: {
        PATH: '/',
        TITLE: 'Мои статьи',
    },
    CREATE_ARTICLE: {
        PATH: '/create',
        TITLE: 'Создать статью',
    },
    ARTICLE_EDITOR: {
        PATH: '/articles/:articleId',
        ROUTE: ARTICLE,
        TITLE: 'Редактировать',
    },
    CLASSIFIER: {
        PATH: '/classifier',
        TITLE: 'Классификатор',
    },
};
