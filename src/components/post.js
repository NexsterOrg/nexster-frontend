import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Box,
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

import { UpdateReactions, CreateReaction } from '../apis/fetch';

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

export default function TimelinePost({profInfo, postInfo, reactsCnt, viewerId, viewerReaction}) {
  const [expanded, setExpanded] = useState(false);
  const [reactions, setReactions] = useState({like: viewerReaction.like, love: viewerReaction.love, laugh: viewerReaction.laugh})
  const [reactionCount, setReactionCount] = useState(reactsCnt)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeLikes = async () => {
    if(viewerReaction.key === ""){
      // create new link
      let newRctKey = await CreateReaction(postInfo.mediaKey, viewerId, { ... reactions, like: !reactions.like})
      
      // error occuried, don't update the reaction state
      if (newRctKey === "") return

      viewerReaction.key = newRctKey
    } else {
      await UpdateReactions(postInfo.mediaKey, viewerReaction.key, viewerId, { ... reactions, like: !reactions.like})
    }
  
    setReactionCount( preCount => {
      return reactions.like ? preCount-1 : preCount+1
    })
    setReactions(preReaction => ({ ... preReaction, like: !preReaction.like}) )
  }

  const changeLove = async () => {
    if(viewerReaction.key === ""){
      let newRctKey = await CreateReaction(postInfo.mediaKey, viewerId, { ... reactions, love: !reactions.love})
      
      if (newRctKey === "") return

      viewerReaction.key = newRctKey
    } else {
      await UpdateReactions(postInfo.mediaKey, viewerReaction.key, viewerId, { ... reactions, love: !reactions.love})
    }

    setReactionCount(preCount => {
      return reactions.love ? preCount-1 : preCount+1
    })
    setReactions(preReaction => ({ ... preReaction, love: !preReaction.love}) )
  }

  const changeLaugh = async () => {
    if(viewerReaction.key === ""){
      let newRctKey = await CreateReaction(postInfo.mediaKey, viewerId, { ... reactions, laugh: !reactions.laugh})
      
      if (newRctKey === "") return
      
      viewerReaction.key = newRctKey
    } else {
      await UpdateReactions(postInfo.mediaKey, viewerReaction.key, viewerId, { ... reactions, laugh: !reactions.laugh})
    }

    setReactionCount(preCount => {
      return reactions.laugh ? preCount-1 : preCount+1
    })
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
      
      <CardContent sx={{paddingBottom: 0}}>
        <Typography variant="body1" color="text.secondary" >
          {postInfo.caption}
        </Typography>
        <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: "5px"}}>
           <Typography  variant="body1"> 👍❤️🙂</Typography>
           <Typography  variant="body2" sx={{marginLeft: "4px", paddingTop: "1px"}}> {reactionCount} </Typography>
        </Box>
      </CardContent>


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
