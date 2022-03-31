import {
    CardContent,
    CardHeader,
    Typography,
    CardActions,
    Avatar,
    Link,
    Card,
    Chip,
} from '@mui/material';

function RepositoryCard({
    name,
    html_url,
    avatar_url,
    stargazers_count,
    description,
    topics,
}: {
    name: string;
    html_url: string;
    avatar_url: string;
    stargazers_count: number;
    description: string;
    topics: string[];
}) {
    return (
        <Card sx={{ mb: 1 }} raised>
            <CardHeader
                avatar={<Avatar src={avatar_url}>R</Avatar>}
                title={name}
                titleTypographyProps={{ fontSize: 25 }}
                subheader={`⭐${stargazers_count}`}
            />
            <CardContent>
                {
                    // Если текста будет много, все уедет. Но я не стал обрабатывать это случай.
                }
                <Typography variant="body2">{description}</Typography>

                {
                    // Если топиков будет много, все уедет. Но я не стал обрабатывать это случай.
                }
                {topics.map((topic: string) => (
                    <Chip label={topic} sx={{ mr: 1, mt: 1 }} />
                ))}
            </CardContent>
            <CardActions>
                <Link href={html_url} target="_blank" underline="always">
                    В репозиторий
                </Link>
            </CardActions>
        </Card>
    );
}

export default RepositoryCard;
