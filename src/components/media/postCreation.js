import { useState, useCallback } from 'react';
import ImageUploading from 'react-images-uploading';
import { Dialog, Button, Typography, Stack, Divider, Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import { TextFieldWithCount } from '../ui/TextComponents';
import { BasicSelect } from '../ui/Select';
import { UploadImage, CreateImagePost } from '../../apis/fetch';
import { SaveLoading } from '../ui/LoadingComponents';
import { BottomLeftSnackbar } from '../ui/snack_bar';

const postNamespace = "post"  // namespace of post in BE

const privateVisi = "private"
const publicVisi = "public"

// Error messages
const titleEmptyErr = "Title field cannot be empty"
const uploadNoImageErr = "Please upload an image"
const uploadImageFailedErr = "Failed to upload the image. Try again."
const createFailed = "Failed to create. Try again."

// Success messages
const createdOk = "Successfully created. Go to Home page."

// post visibility message
const publicPostMsg = "Public posts are visible to all users on the site."
const privatePostMsg = "Private posts are only visible to you."

export default function PostCreationDialog({isCreatePostOpen, setIsCreatePostOpen}) {

  const [saveSpinner, startSaveSpinner] = useState(false)
  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [images, setImages] = useState([]);
  const [imagesErr, setImagesErr] = useState("");

  const [title, setTitle] = useState("")
  const [titleErr, setTitleErr] = useState("")

  const [description, setDescription] = useState("")
  const [descriptionErr, setDescriptionErr] = useState("")

  const [visibility,  setVisibility] = useState(privateVisi)

  const [errMsg, setErrMsg] = useState("")

  /** TODO:
   * 1. what should happen when input field text exceeded. Will us allow to submit or not?? 
   */

  const onCreate = async () => {
    if(images.length === 0) {
      setImagesErr(uploadNoImageErr)
      return
    }
    if(title === "") {
      setTitleErr(titleEmptyErr)
      return 
    }
    if(titleErr || descriptionErr) {
      return
    }
  
    startSaveSpinner(true)

    try {
      const img = images[0]
      const typeName = getImageType(img["file"]["type"])
      const imageName = await UploadImage(postNamespace, typeName, img["data_url"])

      if(imageName === "") {
        startSaveSpinner(false)
        setErrMsg(uploadImageFailedErr)
        setSnackBarOpen(true)
        return
      } 
  
      // submit data to create post.
      const respData = await CreateImagePost(imageName, visibility, title, description)
      startSaveSpinner(false)
      if(respData.isErr) {
        setErrMsg(createFailed)
        setSnackBarOpen(true)
        return
      }
    } catch (error) {
      startSaveSpinner(false)
      setErrMsg(createFailed)
      setSnackBarOpen(true)
      return
    }
    setErrMsg("")
    setSnackBarOpen(true)
      // TODO: what to do with mediaKey and mediaOwnerEdgeKey.
    setImages([])
    setTitle("")
    setDescription("")
    setVisibility(privateVisi)

    setImagesErr("")
    setTitleErr("")
    setDescriptionErr("")

    setIsCreatePostOpen(false)
    
  }

  const onCancel = useCallback(() => {
    setErrMsg("")
    setImages([])
    setTitle("")
    setDescription("")
    setVisibility(privateVisi)

    setImagesErr("")
    setTitleErr("")
    setDescriptionErr("")

    setIsCreatePostOpen(false)
  }, [])

  const snackInfo = errMsg === "" ? {level: "success", msg: createdOk} : {level: "error", msg: errMsg}
  return (
    <>
    <Dialog
      open={isCreatePostOpen} 
      onClose={onCancel}
      scroll={"paper"}
      aria-labelledby="post-upload-model-title"
      aria-describedby="post-upload-model-description"
    > 
    {saveSpinner ? null : <Header />}
    <Stack sx={{ width: 650, minHeight: 650, marginBottom: 2 }} >
    { saveSpinner ?  <SaveLoading rootStyles={{marginTop: 10}} /> :
      <>
        <PostImageUpload images={images} setImages={setImages} uploadErr={imagesErr} setUploadErr={setImagesErr}/>
        <EventInputData 
          title={title} setTitle={setTitle} titleErr={titleErr} setTitleErr={setTitleErr}
          description={description} setDescription={setDescription} descriptionErr={descriptionErr} setDescriptionErr={setDescriptionErr}
          visibility={visibility} setVisibility={setVisibility}
        />
        <FormActionButtons onCreate={onCreate} onCancel={onCancel} mode={visibility}/> 
      </>
    }
    </Stack> 
  </Dialog>
  <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
  </>
  );
}

const selectWidth = {
  xl: 130,
  lg: 125,
  xmd: 120,
  md: 115,
  sm: 110
}

function EventInputData({title, titleErr, description, descriptionErr, visibility, setTitle, setTitleErr, setDescription, 
    setDescriptionErr, setVisibility }){

  return (
    <Stack sx={{paddingLeft: 2, marginBottom: 4}} spacing={2}>

      <TextFieldWithCount content={title} setContent={setTitle} textErr={titleErr} setTextErr={setTitleErr} variant="standard"
        textFieldStyles={{width: "90%"}} maxCount={30} required={true} multiline={false} label={"title"} maxRows={1}/>

      <TextFieldWithCount content={description} setContent={setDescription} textErr={descriptionErr} setTextErr={setDescriptionErr}
        textFieldStyles={{width: "90%"}} maxCount={100} required={false} multiline={true} variant="standard" 
        label={"description"} maxRows={4} />

      <Stack direction={"row"} spacing={3}>
        <BasicSelect value={visibility} setValue={setVisibility}
          label={"visibility"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue={privateVisi}
          options={[
            {label: "private", value: privateVisi},
            {label: "public", value: publicVisi }
          ]}/>
      </Stack>
    </Stack>
  )
}

/** TODO: 
 * 1. Need to think about max lengths
 * 2. Max length of event link/venue. Think about meeting link lengths. not a good idea to break meeting links.
 * 3. 
 */

function FormActionButtons({onCreate, onCancel, mode}){

  return (
    <Stack direction={"row"} justifyContent={"space-between"} >
      <Stack justifyContent={"flex-end"} sx={{paddingLeft: 2}}>
        <Typography variant='caption'> {
            mode === publicVisi ? publicPostMsg : privatePostMsg
        } </Typography>
      </Stack>
      <Stack direction={"row"} spacing={1} sx={{paddingRight: 2}}>
        <Button sx={{textTransform: "none"}} variant='contained' onClick={onCreate}> Create </Button>
        <Button sx={{textTransform: "none"}} variant='contained' onClick={onCancel}> Cancel </Button>
      </Stack>
    </Stack>
  )
}

function Header(){
  return (
    <>
    <Stack direction={"row"} justifyContent={"center"} sx={{paddingY: 1}}>
        <Typography sx={{fontWeight: "bold"}} > Create new post </Typography>
    </Stack>
    <Divider />
    </>
  )
}

function getImageType(mimeType){
  if(typeof mimeType !== "string") return ""
  const parts = mimeType.split('/');
  return parts.length !== 2  ? "" : parts[1]
}

function PostImageUpload({images, setImages, uploadErr, setUploadErr}){

  const onChange = (imageList) => {
    setUploadErr("")
    setImages(imageList);
  };

  return (
    <ImageUploading
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
        acceptType={['jpg', 'png']}
    >
      {({
        imageList,
        onImageUpload
      }) => (
      <>
        <Stack alignItems="center" spacing={2}>
            <Stack sx={{width: 500, height: 300, marginTop: 2 }} justifyContent={"center"} alignItems={"center"}>
              {
                imageList.length ? 
                imageList.map((img, index) => (
                  <Avatar key={index} variant='square'
                    src={img['data_url']}
                    sx={{width: 500, height: 300 }}
                  />
                )) : <> 
                      <ImageIcon sx={{ width: 80, height: 80 }}/> 
                      { uploadErr ? <Typography sx={{color: "red"}}> *{uploadErr} </Typography> : null }
                    </>
              }

            </Stack>
            <Button variant='contained' sx={{textTransform: "none"}} onClick={onImageUpload} size='small'> Upload image </Button>
        </Stack>
      </>
      )}
      </ImageUploading>
  )
}
