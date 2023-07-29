import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardMedia, CardContent, CardActions, 
  Collapse, Avatar, IconButton, Typography} from "@mui/material"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Filled Icons
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';

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
  const [expanded, setExpanded] = useState(false);
  const [reactions, setReactions] = useState({like: false, love: false, laugh: false})

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeLikes = () => {
    setReactions(preReaction => ({ ... preReaction, like: !preReaction.like}) )
  }

  const changeLove = () => {
    setReactions(preReaction => ({ ... preReaction, love: !preReaction.love}) )
  }

  const changeLaugh = () => {
    setReactions(preReaction => ({ ... preReaction, laugh: !preReaction.laugh}) )
  }

  return (
    <Card sx={{ maxWidth: 475 }} elevation={4}>
      <CardHeader
        avatar={<Avatar src={profInfo.profUrl} aria-label={`${profInfo.name}`} />}
        title={profInfo.name}
        subheader={profInfo.postDate}
      />
      {/* TODO: when click on profile picture, this should redirect to his personal profile */}
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

      {/* Reactions Sections */}
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={changeLikes}>
          {reactions.like ? <ThumbUpRoundedIcon/>: <ThumbUpOutlinedIcon/>}
        </IconButton>
        <IconButton aria-label="love" onClick={changeLove}>
         {reactions.love ? <FavoriteIcon/> : <FavoriteBorderOutlinedIcon/>}
        </IconButton>
        <IconButton aria-label="laugh" onClick={changeLaugh}>
          {reactions.laugh ? <InsertEmoticonRoundedIcon/> : <InsertEmoticonOutlinedIcon />}
        </IconButton>

        {postInfo.description  ? 
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> : null}
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
