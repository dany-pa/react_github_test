import { Repository } from '../../api';
import Action from './actions';

export type State = {
    q: string;
    totalCount: number;
    repositoriesCards: Repository[];
    page: number;
    errorMessage: string | null;
    isLoading: boolean;
};

export const defaultState: State = {
    q: '',
    totalCount: 0,
    repositoriesCards: [],
    page: 0,
    errorMessage: null,
    isLoading: false,
};

export default (state: State | undefined, action: Action): State => {
    state = state || defaultState;

    switch (action.type) {
        case 'SET_Q':
            return {
                ...state,
                // ВОПРОС: Как правильней поступить с заданием дефолтного значения, если ничего не пришло в пэйлоаде?
                q: action.payload.q || '',
            };

        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalCount: action.payload.totalCount || 0,
            };

        case 'SET_REPOSITORIES_CARDS':
            return {
                ...state,
                repositoriesCards: action.payload.repositoriesCards || [],
            };

        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload.page || 0,
            };

        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.payload.errorMessage || null,
            };

        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload.isLoading || false,
            };

        default:
            return state;
    }
};
