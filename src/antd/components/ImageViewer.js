import React from 'react';
import { Image } from 'antd';

const ImagePreviewer = ({style, imgUrls, firstImgUrl}) => (
  <Image.PreviewGroup
    items={imgUrls}
  >
    <Image
      style={style}
      src={firstImgUrl}
    />
  </Image.PreviewGroup>
);

export default ImagePreviewer;
