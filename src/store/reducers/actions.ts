import { Repository } from '../../api';

export type SetQ = {
    type: 'SET_Q';
    payload: {
        q: string;
    };
};

export type SetTotalCount = {
    type: 'SET_TOTAL_COUNT';
    payload: {
        totalCount: number;
    };
};

export type SetRepositoriesCards = {
    type: 'SET_REPOSITORIES_CARDS';
    payload: {
        repositoriesCards: Repository[];
    };
};

export type SetPage = {
    type: 'SET_PAGE';
    payload: {
        page: number;
    };
};

export type SetErrorMessage = {
    type: 'SET_ERROR_MESSAGE';
    payload: {
        errorMessage: string | null;
    };
};

export type SetIsLoading = {
    type: 'SET_IS_LOADING';
    payload: {
        isLoading: boolean;
    };
};

type Action =
    | SetQ
    | SetTotalCount
    | SetRepositoriesCards
    | SetPage
    | SetErrorMessage
    | SetIsLoading;

export default Action;
