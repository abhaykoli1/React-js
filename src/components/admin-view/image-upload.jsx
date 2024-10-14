import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

import { Skeleton } from "../ui/skeleton";
import { storage } from "../../../firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
function RidesImageUpload({
  isRemoveImage,
  folder,
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
  title,
  setDisable,
}) {
  const [per, setPerc] = useState(null);

  const inputRef = useRef(null);
  // console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    // console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    // console.log(selectedFile);
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
  useEffect(() => {
    if (isRemoveImage === true) {
      handleRemoveImage();
    } else if (per === 100) {
      setDisable(false);
      console.log("Called", per);
    }
  });
  function handleRemoveImage() {
    // setDisable(true);
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  async function uploadImageToFirebaseStorage() {
    // console.log("image uploading");
    // const storageRef = ref(storage, imageFile.name);

    const storageRef = ref(storage, `${folder}/${imageFile.name}`);

    // console.log("StorageRef", storageRef);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setPerc((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // console.log("Upload is " + progress + "% done");
        // setPerc(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Downloaded UrL", downloadURL);
          setImageLoadingState(false);
          setUploadedImageUrl(downloadURL);
        });
      }
    );
  }
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToFirebaseStorage();
      setImageLoadingState(true);
    }
    console.log("image :", imageFile);
  }, [imageFile]);

  return (
    <div
      className={`w-full mb-5 mt-4 ${
        isCustomStyling ? "" : "max-w-md mx-auto"
      }`}
    >
      <Label className="text-md font-medium mb-2 block">{title}</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              className="bg-white hover:bg-white border-none"
              onClick={handleRemoveImage}
            >
              <XIcon className="text-black hover:w-7 h-7" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      {imageFile ? (
        <p className="text-green-600">{per + " % Completed"} </p>
      ) : null}
    </div>
  );
}

export default RidesImageUpload;
