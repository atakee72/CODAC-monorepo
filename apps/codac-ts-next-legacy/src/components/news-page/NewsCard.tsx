import Avatar from '@mui/material/Avatar';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ThumbUp from 'mdi-material-ui/ThumbUp';
import ThumbUpOutline from 'mdi-material-ui/ThumbUpOutline';
import React from 'react';

import { NewsPostEntity } from '../../../cabServer/global/__generated__/types';
import { useAuth } from '../../hooks/useAuth';

const ProjectCard = ({ newsPost }: { newsPost: NewsPostEntity }) => {
  // console.log('news post component', newsPost);

  const updatedDate: String = new Date(
    newsPost.attributes?.updatedAt,
  ).toLocaleString('en-UK', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const { user } = useAuth();

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Stack direction="row" justifyContent="right">
          <Chip
            label={newsPost.attributes?.tags}
            color="primary"
            size="small"
          />
        </Stack>
        <CardHeader
          avatar={
            <Avatar
              srcSet={
                newsPost.attributes?.author?.data?.attributes?.avatar?.data
                  ?.attributes?.url
              }
              aria-label=""
            />
          }
          title={newsPost.attributes?.author?.data?.attributes?.username}
          subheader={updatedDate}
        />
      </CardContent>
      <CardMedia
        component={'img'}
        height={'274'}
        image={newsPost.attributes?.image?.data?.attributes?.url || 'no image'}
      />
      <CardContent>
        <Box
          sx={{ mr: 1, mb: 2, ml: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant="h5">{newsPost.attributes?.title}</Typography>{' '}
          <br />
          <Typography variant="body2">
            {newsPost.attributes?.post}
          </Typography>{' '}
          <br />
          {user ? (
            <Stack direction="row" justifyContent="right">
              <ThumbUpOutline fontSize="small" />
            </Stack>
          ) : (
            ''
          )}
          {/* show likes if likes exist */}
          {newsPost.attributes?.likes?.data &&
          newsPost.attributes?.likes?.data?.length > 0 ? (
            <div>
              <Tooltip
                title={newsPost.attributes?.likes?.data?.map(
                  (like) => like.attributes?.username,
                )}
                placement="right-end"
              >
                <ThumbUp color="primary" fontSize="small" />
              </Tooltip>
              <Typography variant="caption" color="primary">
                {' '}
                {newsPost.attributes?.likes?.data?.length}
              </Typography>
            </div>
          ) : (
            ''
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
