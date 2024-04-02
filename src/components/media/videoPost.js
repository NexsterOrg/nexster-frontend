import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import ReactPlayer from "react-player/youtube";

const videoWidth = {
  xl: "35vw",
  lg: "38vw",
  xmd: "40vw",
  md: "40vw",
  sm: "40vw"
}

export default function TimelineVideoPost({ postInfo }) {

  return (
    <Card sx={{ width: videoWidth, height: "auto" }} elevation={4}>
      <CardHeader sx={{ padding: "10px" }}
        title={<Typography variant="body1" sx={{fontWeight: "bold"}}>{postInfo.title}</Typography>}
        subheader={<Typography variant="caption">{postInfo.postDate}</Typography>}
      />
      <ReactPlayer url={postInfo.url} controls width="100%" height="78vh" light={true}/>
      <CardContent sx={{ paddingBottom: 0 }}></CardContent>
    </Card>
  );
}
