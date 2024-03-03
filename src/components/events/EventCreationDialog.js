import { useState, useCallback } from "react";
import ImageUploading from "react-images-uploading";
import {
  Dialog,
  Button,
  Typography,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import dayjs from "dayjs";

import { TextFieldWithCount } from "../ui/TextComponents";
import { BasicDateTimePicker } from "../ui/DateTimePicker";
import { BasicSelect } from "../ui/Select";
import { UploadImage, CreateEvent } from "../../apis/fetch";
import { SaveLoading } from "../ui/LoadingComponents";
import { BottomLeftSnackbar } from "../ui/snack_bar";
import { AddMonths } from "../../helper/date";
import ImageUploader from "../../antd/components/ImageUploader";

const posterNamespace = "event-posters";

// Error messages
const titleEmptyErr = "Title field cannot be empty";
const uploadNoImageErr = "Please upload an image";
const dateEmptyErr = "Please provide the event date";
const createFailed = "Failed to create. Try again.";

// Success messages
const createdOk = "Successfully created. Refresh the page.";

// dates
const oneHour = 60 * 60 * 1000;
const currentDate = new Date();
const maxDate = dayjs(AddMonths(currentDate, 6)); // set max date as 6 months from now
const minDate = dayjs(new Date(currentDate.getTime() + oneHour));

// lengths
const maxEventTitle = 100;
const maxEventDesc = 1000;
const maxRowsDesc = 25;

export default function EventCreationDialog({
  isCreateEventOpen,
  setIsCreateEventOpen,
}) {
  const [saveSpinner, startSaveSpinner] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [images, setImages] = useState([]);
  const [imagesErr, setImagesErr] = useState("");

  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");

  const [venueOrLink, setVenueOrLink] = useState("");
  const [venueOrLinkErr, setVenueOrLinkErr] = useState("");

  const [mode, setMode] = useState("physical");

  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState("");

  const [errMsg, setErrMsg] = useState("");

  /** TODO:
   * 1. what should happen when input field text exceeded. Will us allow to submit or not??
   */

  const onCreate = async () => {
    if (images.length === 0) {
      setImagesErr(uploadNoImageErr);
      return;
    }
    if (title === "") {
      setTitleErr(titleEmptyErr);
      return;
    }
    if (date === "") {
      setDateErr(dateEmptyErr);
      return;
    }
    if (titleErr || descriptionErr || venueOrLinkErr) {
      return;
    }

    startSaveSpinner(true);

    try {
      const { backendId, type } = images[0];

      if (!backendId || !type) {
        startSaveSpinner(false);
        setErrMsg(uploadNoImageErr);
        setSnackBarOpen(true);
        return;
      }

      // submit data to create event.
      const respData = await CreateEvent(
        backendId,
        type,
        title,
        date,
        description,
        venueOrLink,
        mode
      );
      startSaveSpinner(false);
      if (respData.isErr) {
        setErrMsg(createFailed);
        setSnackBarOpen(true);
        return;
      }
    } catch (error) {
      startSaveSpinner(false);
      setErrMsg(createFailed);
      setSnackBarOpen(true);
      return;
    }
    setErrMsg("");
    setSnackBarOpen(true);
    // TODO: what to do with eventKey and authorKey.
    setImages([]);
    setTitle("");
    setDescription("");
    setVenueOrLink("");
    setMode("physical");
    setDate("");

    setImagesErr("");
    setTitleErr("");
    setDescriptionErr("");
    setVenueOrLinkErr("");
    setDateErr("");

    setIsCreateEventOpen(false);
  };

  const onCancel = useCallback(() => {
    setErrMsg("");
    setImages([]);
    setTitle("");
    setDescription("");
    setVenueOrLink("");
    setMode("physical");
    setDate("");

    setImagesErr("");
    setTitleErr("");
    setDescriptionErr("");
    setVenueOrLinkErr("");
    setDateErr("");

    setIsCreateEventOpen(false);
  }, []);

  const snackInfo =
    errMsg === ""
      ? { level: "success", msg: createdOk }
      : { level: "error", msg: errMsg };
  return (
    <>
      <Dialog
        open={isCreateEventOpen}
        onClose={onCancel}
        scroll={"paper"}
        aria-labelledby="poster-upload-model-title"
        aria-describedby="poster-upload-model-description"
      >
        {saveSpinner ? null : <Header />}
        <Stack sx={{ width: 650, minHeight: 500, marginBottom: 2 }}>
          {saveSpinner ? (
            <SaveLoading rootStyles={{ marginTop: 10 }} label={"Saving..."} />
          ) : (
            <>
              {/* <PosterUpload images={images} setImages={setImages} uploadErr={imagesErr} setUploadErr={setImagesErr}/> */}
              <Stack
                sx={{ paddingTop: "20px", paddingLeft: "10px" }}
                alignItems={"center"}
                spacing={2}
              >
                <Typography> Upload Image </Typography>
                <ImageUploader
                  imgArr={images}
                  setImgArr={setImages}
                  namespace={posterNamespace}
                  maxImgCount={1}
                  aspectSlider={true}
                  cropShape={"rect"}
                />
                {imagesErr !== "" ? (
                  <Typography sx={{ color: "red" }} variant="caption">
                    {" "}
                    {imagesErr}{" "}
                  </Typography>
                ) : null}
              </Stack>
              <EventInputData
                title={title}
                setTitle={setTitle}
                titleErr={titleErr}
                setTitleErr={setTitleErr}
                description={description}
                setDescription={setDescription}
                descriptionErr={descriptionErr}
                setDescriptionErr={setDescriptionErr}
                venueOrLink={venueOrLink}
                setVenueOrLink={setVenueOrLink}
                venueOrLinkErr={venueOrLinkErr}
                setVenueOrLinkErr={setVenueOrLinkErr}
                mode={mode}
                setMode={setMode}
                date={date}
                setDate={setDate}
                dateErr={dateErr}
                setDateErr={setDateErr}
              />
              <FormActionButtons onCreate={onCreate} onCancel={onCancel} />
            </>
          )}
        </Stack>
      </Dialog>
      <BottomLeftSnackbar
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        level={snackInfo.level}
        msg={snackInfo.msg}
      />
    </>
  );
}

const selectWidth = {
  xl: 130,
  lg: 125,
  xmd: 120,
  md: 115,
  sm: 110,
};

function EventInputData({
  title,
  titleErr,
  description,
  descriptionErr,
  venueOrLink,
  venueOrLinkErr,
  mode,
  date,
  dateErr,
  setTitle,
  setTitleErr,
  setDescription,
  setDescriptionErr,
  setVenueOrLink,
  setVenueOrLinkErr,
  setMode,
  setDate,
  setDateErr,
}) {
  const modeParms =
    mode === "physical"
      ? { label: "venue", maxCount: 30 }
      : { label: "meeting link", maxCount: 100 };

  return (
    <Stack sx={{ paddingLeft: 2, marginBottom: 4 }} spacing={2}>
      <TextFieldWithCount
        content={title}
        setContent={setTitle}
        textErr={titleErr}
        setTextErr={setTitleErr}
        variant="standard"
        textFieldStyles={{ width: "90%" }}
        maxCount={maxEventTitle}
        required={true}
        multiline={true}
        label={"title"}
        maxRows={2}
      />

      <TextFieldWithCount
        content={description}
        setContent={setDescription}
        textErr={descriptionErr}
        setTextErr={setDescriptionErr}
        textFieldStyles={{ width: "90%" }}
        maxCount={maxEventDesc}
        required={false}
        multiline={true}
        variant="standard"
        label={"description"}
        maxRows={maxRowsDesc}
        placeholder={"keep it short and concise"}
      />

      <Stack direction={"row"} spacing={3}>
        <BasicDateTimePicker
          label={"date"}
          value={date}
          setValue={setDate}
          textErr={dateErr}
          formatType={"ampm"}
          setTextErr={setDateErr}
          minDate={minDate}
          maxDate={maxDate}
        />
        <BasicSelect
          value={mode}
          setValue={setMode}
          label={"mode"}
          styles={{ paddingTop: "8px", width: selectWidth }}
          defaultValue="physical"
          options={[
            { label: "physical", value: "physical" },
            { label: "online", value: "online" },
          ]}
        />
      </Stack>
      <TextFieldWithCount
        content={venueOrLink}
        setContent={setVenueOrLink}
        textErr={venueOrLinkErr}
        setTextErr={setVenueOrLinkErr}
        variant="standard"
        textFieldStyles={{ width: "90%" }}
        maxCount={modeParms.maxCount}
        required={false}
        multiline={false}
        label={modeParms.label}
      />
    </Stack>
  );
}

/** TODO:
 * 1. Need to think about max lengths
 * 2. Max length of event link/venue. Think about meeting link lengths. not a good idea to break meeting links.
 * 3.
 */

/**
 * Issue:
 * 1. DateTimePicker is too short in small screens.
 *
 */

function FormActionButtons({ onCreate, onCancel }) {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack justifyContent={"flex-end"} sx={{ paddingLeft: 2 }}>
        <Typography variant="caption">
          {" "}
          This event will be visible to everyone on the site{" "}
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={1} sx={{ paddingRight: 2 }}>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={onCreate}
        >
          {" "}
          Create{" "}
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={onCancel}
        >
          {" "}
          Cancel{" "}
        </Button>
      </Stack>
    </Stack>
  );
}

function Header() {
  return (
    <>
      <Stack direction={"row"} justifyContent={"center"} sx={{ paddingY: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}> Create new event </Typography>
      </Stack>
      <Divider />
    </>
  );
}

function getImageType(mimeType) {
  if (typeof mimeType !== "string") return "";
  const parts = mimeType.split("/");
  return parts.length !== 2 ? "" : parts[1];
}

function PosterUpload({ images, setImages, uploadErr, setUploadErr }) {
  const onChange = (imageList) => {
    setUploadErr("");
    setImages(imageList);
  };

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
      acceptType={["jpg", "png"]}
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
            <Stack
              sx={{ width: 500, height: 300, marginTop: 2 }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {imageList.length ? (
                imageList.map((img, index) => (
                  <Avatar
                    key={index}
                    variant="square"
                    src={img["data_url"]}
                    sx={{ width: 500, height: 300 }}
                  />
                ))
              ) : (
                <>
                  <ImageIcon sx={{ width: 80, height: 80 }} />
                  {uploadErr ? (
                    <Typography sx={{ color: "red" }}>
                      {" "}
                      *{uploadErr}{" "}
                    </Typography>
                  ) : null}
                </>
              )}
            </Stack>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={onImageUpload}
              size="small"
            >
              {" "}
              Upload image{" "}
            </Button>
          </Stack>
        </>
      )}
    </ImageUploading>
  );
}
