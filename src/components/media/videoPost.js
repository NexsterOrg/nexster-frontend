import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ReactPlayer from "react-player";

export default function TimelineVideoPost({ postInfo }) {
  const navigate = useNavigate();
  console.log(postInfo.url);

  return (
    <Card sx={{ maxWidth: 450, minWidth: 450 }} elevation={4}>
      <CardHeader
        title={<div>{postInfo.title}</div>}
        subheader={<div>{postInfo.postDate}</div>}
      />
      <ReactPlayer url={postInfo.url} controls width="100%" height="350px" />
      <CardContent sx={{ paddingBottom: 0 }}></CardContent>
    </Card>
  );
}
