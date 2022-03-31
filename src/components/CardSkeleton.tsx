import { Stack, Skeleton } from '@mui/material';

function CardSkeleton() {
    return (
        <Stack
            spacing={1}
            sx={{
                margin: '0 auto 10px auto',
                border: '1px solid rgba(0, 0, 0, 0.11)',
                padding: 1,
                width: 530,
            }}
        >
            <Skeleton
                variant="rectangular"
                width={530}
                height={20}
                animation="wave"
            />
            <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation="wave"
            />
            <Skeleton
                variant="rectangular"
                width={530}
                height={118}
                animation="wave"
            />
        </Stack>
    );
}

export default CardSkeleton;
