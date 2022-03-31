import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from './store/reducers';
import { Repository } from './api';
import { MAX_PAGES, PER_PAGE } from './const';
import RepositoryCard from './components/RepositoryCard';
import CardSkeleton from './components/CardSkeleton';
import {
    Container,
    Pagination,
    Card,
    Box,
    TextField,
    Typography,
} from '@mui/material';

function App() {
    // Вопрос: Как быть с именем dispatch если мне надо использовать и useDispatch() и useReducer со своим dispatch?
    const dispatch = useDispatch();

    const q = useSelector((state: State): string => state.q);
    const onQChange = useCallback(
        (e) => {
            dispatch({ type: '*SET_Q', payload: { q: e.target.value } });
        },
        [dispatch]
    );

    const isLoading = useSelector((state: State): boolean => state.isLoading);
    const errorMessage = useSelector(
        (state: State): string | null => state.errorMessage
    );
    const totalCount = useSelector((state: State): number => state.totalCount);
    const page = useSelector((state: State): number => state.page);
    const repositoriesCards = useSelector(
        (state: State): Repository[] => state.repositoriesCards
    );

    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        const pages = Math.ceil(totalCount / PER_PAGE);
        setPageCount(pages > MAX_PAGES ? MAX_PAGES : pages);
    }, [totalCount]);

    const onPageChange = useCallback(
        (e, page) => {
            dispatch({ type: '*SET_PAGE', payload: { page } });
        },
        [dispatch]
    );

    // ВОПРОС: Надо это выносить в отдельный компонент? Или подход с функцией тоже нормальный?
    const getPagination = () => {
        if (totalCount > 0) {
            return (
                <Pagination
                    count={pageCount}
                    color="primary"
                    onChange={onPageChange}
                    page={page}
                />
            );
        }

        // ВОПРОС: Нужно всегда null возвращать, или можно обойтись и undefined?
        return null;
    };

    const getErrorMessage = () => {
        if (errorMessage) {
            return <Typography color="red">Ошибка: {errorMessage}</Typography>;
        }

        return null;
    };

    const getCards = () => {
        if (isLoading) return <CardSkeleton />;

        return repositoriesCards.map((card: Repository, index: number) => (
            //Почему-то остоянно вылезает ошибка Each child in a list should have a unique "key" prop.
            <RepositoryCard
                name={card.name}
                html_url={card.html_url}
                avatar_url={card.owner.avatar_url}
                stargazers_count={card.stargazers_count}
                description={card.description}
                topics={card.topics}
                key={index.toString()}
            />
        ));
    };

    const getSadMessage = () => {
        if (page == 100) return <Typography color="red">Гитхаб больше не разрешает :(</Typography>;
        return null;
    };

    const TOP_HEIGHT = 120;
    const PAGINATION_HEIGHT = 50;
    const SAD_MESSAGE_HEIGHT = 20;
    const CARDS_PADDING = 20;
    const [topHeight, setTopHeight] = useState(TOP_HEIGHT);

    useEffect(() => {
        const paginationHeight = pageCount > 0 ? PAGINATION_HEIGHT : 0;
        const sadMessageHeight = page == 100 ? SAD_MESSAGE_HEIGHT : 0;

        setTopHeight(TOP_HEIGHT + paginationHeight + sadMessageHeight);
    }, [pageCount, page]);

    return (
        <Container
            sx={{ my: 4, paddingTop: `${topHeight + CARDS_PADDING}px` }}
            maxWidth="sm"
        >
            {
                // ВОПРОС: Нужно <Card> оборачивать в <Box> ?
                // Со стилями я не стал заморачиваться и просто записал их везде прямо в компоненте. Какой подход стоит использовать в реальных проектах?
            }
            <Card
                sx={{
                    my: 2,
                    padding: '10px',
                    position: 'fixed',
                    width: '530px',
                    backgroundColor: '#fff',
                    zIndex: 9,
                    height: topHeight,
                    top: 0,
                }}
            >
                <TextField
                    value={q}
                    onChange={onQChange}
                    helperText="Введи название репозитория"
                    label="Поиск"
                    fullWidth
                />
                <h3>Найдено репозиториев: {totalCount}</h3>

                {getPagination()}

                {getSadMessage()}
            </Card>

            <Box>{getCards()}</Box>

            {getErrorMessage()}
        </Container>
    );
}

export default App;
