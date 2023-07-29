import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Filled Icons
// import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';

// outlined icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TimelinePost({profInfo, postInfo}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 475 }} elevation={4}>
      <CardHeader
        avatar={<Avatar src={profInfo.profUrl} aria-label={`${profInfo.name}`} />}
        title={profInfo.name}
        subheader={profInfo.postDate}
      />
      <CardMedia
        component="img"
        height="500"
        image={postInfo.imgUrl}
        alt={`${profInfo.name}-${profInfo.postDate}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {postInfo.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton aria-label="like">
          <ThumbUpOutlinedIcon />
        </IconButton>
        <IconButton aria-label="love">
          <FavoriteBorderOutlinedIcon />
        </IconButton>

        <IconButton aria-label="laugh">
          <InsertEmoticonOutlinedIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {postInfo.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
