import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { Dialog, Button, Typography, Stack, Divider, Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import { TextFieldWithCount } from '../ui/TextComponents';
import { BasicDateTimePicker } from '../ui/DateTimePicker';
import { BasicSelect } from '../ui/Select';
import { UploadImage, CreateEvent } from '../../apis/fetch';

const posterNamespace = "event-posters"

// Error messages
const titleEmptyErr = "Title field cannot be empty"
const uploadNoImageErr = "Please upload an image"
const dateEmptyErr = "Please provide the event date"

export default function EventCreationDialog() {
  const [images, setImages] = useState([]);
  const [imagesErr, setImagesErr] = useState("");

  const [title, setTitle] = useState("")
  const [titleErr, setTitleErr] = useState("")

  const [description, setDescription] = useState("")
  const [descriptionErr, setDescriptionErr] = useState("")

  const [venueOrLink, setVenueOrLink] = useState("")
  const [venueOrLinkErr, setVenueOrLinkErr] = useState("")

  const [mode, setMode] = useState("physical")

  const [date, setDate] = useState("")
  const [dateErr, setDateErr] = useState("")

  /** todo:
   * 1. Need to check things are not empty. (title, mode, date) - done
   * 2. Some loading indication.
   * 3. what should happen when input field text exceeded. Will us allow to submit or not?? 
   * 4. change date picker time show format - done
   * 
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
    if(date === ""){
      setDateErr(dateEmptyErr)
      return
    }
    if(titleErr || descriptionErr ||  venueOrLinkErr) {
      return
    }

    const img = images[0]
    const typeName = getImageType(img["file"]["type"])
    const imageName = await UploadImage(posterNamespace, typeName, img["data_url"])
    if(imageName === "") return // failed to upload the image. 

    // submit data to create event.
    const respData = await CreateEvent(imageName, typeName, title, date, description, venueOrLink, mode)
    if(respData.isErr) {
      return // TODO: do things required for failure. (eg:- failure popup)
    }
    // TODO: what to do with eventKey and authorKey.
    setImages([])
    setTitle("")
    setDescription("")
    setVenueOrLink("")
    setMode("physical")
    setDate("")
  }

  const onCancel = () => {
    setImages([])
    setTitle("")
    setDescription("")
    setVenueOrLink("")
  }

  return (
    <Dialog
      open={true} 
      onClose={() => {}}
      scroll={"paper"}
      aria-labelledby="poster-upload-model-title"
      aria-describedby="poster-upload-model-description"
    > 
    <Header />
    <Stack sx={{ width: 650, minHeight: 650, marginBottom: 2 }} >
      <PosterUpload images={images} setImages={setImages} uploadErr={imagesErr} setUploadErr={setImagesErr}/>
      <EventInputData 
        title={title} setTitle={setTitle} titleErr={titleErr} setTitleErr={setTitleErr}
        description={description} setDescription={setDescription} descriptionErr={descriptionErr} setDescriptionErr={setDescriptionErr}
        venueOrLink={venueOrLink} setVenueOrLink={setVenueOrLink} venueOrLinkErr={venueOrLinkErr} setVenueOrLinkErr={setVenueOrLinkErr}
        mode={mode} setMode={setMode}
        date={date} setDate={setDate} dateErr={dateErr} setDateErr={setDateErr}
      />
      <FormActionButtons onCreate={onCreate} onCancel={onCancel}/>
    </Stack>
  </Dialog>
   
  );
}

const selectWidth = {
  xl: 130,
  lg: 125,
  xmd: 120,
  md: 115,
  sm: 110
}

function EventInputData({title, titleErr, description, descriptionErr, venueOrLink, venueOrLinkErr,  mode, date, dateErr, setTitle, 
  setTitleErr, setDescription, setDescriptionErr, setVenueOrLink, setVenueOrLinkErr, setMode, setDate, setDateErr}){
  const modeParms = mode === "physical"  ? {label: "venue", maxCount: 30} : {label: "meeting link", maxCount: 100}

  return (
    <Stack sx={{paddingLeft: 2, marginBottom: 4}} spacing={2}>

      <TextFieldWithCount content={title} setContent={setTitle} textErr={titleErr} setTextErr={setTitleErr}
        textFieldStyles={{width: "90%"}} maxCount={30} required={true} multiline={false} label={"title"} maxRows={1}/>

      <TextFieldWithCount content={description} setContent={setDescription} textErr={descriptionErr} setTextErr={setDescriptionErr}
        textFieldStyles={{width: "90%"}} maxCount={100} required={false} multiline={true} 
        label={"description"} maxRows={4} placeholder={"keep it short and concise"}/>

      <Stack direction={"row"} spacing={3}>
        <BasicDateTimePicker label={"date"} value={date} setValue={setDate} textErr={dateErr} setTextErr={setDateErr}/>
        <BasicSelect value={mode} setValue={setMode}
          label={"mode"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue="physical"
          options={[
            {label: "physical", value: "physical"},
            {label: "online", value: "online"}
          ]}/>
      </Stack>
      <TextFieldWithCount content={venueOrLink} setContent={setVenueOrLink} textErr={venueOrLinkErr} setTextErr={setVenueOrLinkErr}
        textFieldStyles={{width: "90%"}} maxCount={modeParms.maxCount} required={false} multiline={false} label={modeParms.label}/>
    </Stack>
  )
}

/** TODO: 
 * 1. Should be a future date. BasicDateTimePicker should be able to put this validation.
 * 2. Need to think about max lengths
 * 3. Change meeting link/venue based on the mode of selection
 * 4. max length of event link/venue . think about meeting link lengths. not a good idea to break meeting links.
 * 5. Check these UI in small laptop.
 */

/** Current work
 * 1. I need to make sure base64 images are possible to store with backend api and cloud.
 * Therefore need to implement this API first.
 * 
 */


function FormActionButtons({onCreate, onCancel}){

  return (
    <Stack direction={"row"} justifyContent={"space-between"} >
      <Stack justifyContent={"flex-end"} sx={{paddingLeft: 2}}>
        <Typography variant='caption'> This event will be visible to everyone on the site </Typography>
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
        <Typography sx={{fontWeight: "bold"}} > Create new event </Typography>
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

function PosterUpload({images, setImages, uploadErr, setUploadErr}){

  const onChange = (imageList) => {
    // const img = imageList[0] 
    // call UploadImage() when submitting the poster
    // UploadImage("event-posters", getImageType(img["file"]["type"]), img["data_url"])
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
        onImageUpload,
        // onImageRemoveAll,
        // onImageUpdate,
        // onImageRemove,
        // isDragging,
        // dragProps,
      }) => (
      <>
        <Stack alignItems="center" spacing={2}>
            <Stack sx={{width: 500, height: 300, marginTop: 2}} justifyContent={"center"} alignItems={"center"}>
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
        {/* <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack justifyContent={"center"}>
              <Typography variant='caption' sx={{paddingLeft: 1}}> This image will be publicly available for all users on the site </Typography>
            </Stack>
            <Button sx={{textTransform: "none"}}> Close </Button>
        </Stack> */}
      </>
      )}
      </ImageUploading>
  )
}
