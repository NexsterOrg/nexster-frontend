import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';

import { ListMediaRoleBased, UnAuthorizedError } from "../../apis/fetch"
import ImageSettingDialog from "./imgSettingDialog"

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
  margin: "5px",
  
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

export default function ImageGrid({userId}) {
  const [imgList, setImgList] = useState([])
  const [dialogInfo, setDialogInfo] = useState({open: false, key: ""})
  const navigate = useNavigate();

  // TODO: Currently only first 10 images are loaded.
  useEffect( () => {
    if (userId === "") return 
    (async () => {
      try {
        let imgs = await ListMediaRoleBased(userId, 1, 10)   // TODO: images should be loaded with the scroll.
        setImgList(imgs)
      } catch (err) {
        if (err instanceof UnAuthorizedError) {
          navigate('/login', { replace: true });
          return
        } 
        console.error("failed to list images: ", err)
      }

    })()
  }, [userId])

  return (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
      {imgList.map((image) => (
        <ImageButton
          focusRipple
          key={image.key}
          style={{
            width: "30%",
          }}
          onClick={() => setDialogInfo({open: true, key: image.key})}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.image_url})` }} />
        </ImageButton>
      ))}
    </Box>
    <ImageSettingDialog imageSetting={dialogInfo} setImageSetting={setDialogInfo}/>
    </>
  );
}
