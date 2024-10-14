import RidesImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addRides } from "@/config";
// import { Home } from "../../assets/image/Home.png";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";
import { useToast } from "@/hooks/use-toast";
import AdminRideDataView from "@/components/admin-view/ridesDataView";

const initialFormData = {
  imageUrl: null,
  ride: "",
  description: "",
  category: "",
  brand: "",
  rent: "",
  totalStock: "",
  averageReview: 0,
};

const AdminRides = () => {
  const { toast } = useToast();
  const [isRemoveImage, setIsRemoveImage] = useState(false);
  const [OpenAddRides, setOpenAddRides] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const [Bikes, setBikes] = useState([]);
  const [Scooty, setScooty] = useState([]);

  const [data, setData] = useState([]);

  console.log("uploadedImageUrl Data :", uploadedImageUrl);

  // console.log("Image From Rides", imageFile);

  // useEffect(() => {
  //   if (imageFile) {
  //     const StorageRef = ref(storage, `Images/${v4()}`); //Image Folder name
  //     uploadBytes(StorageRef, imageFile).then((imageData) => {
  //       console.log("StorageRef", imageData);
  //       getDownloadURL(imageData.ref).then((val) => {
  //         setUploadedImageUrl(val);
  //         console.log("Image Url", val);
  //       });
  //     });
  //   }
  // }, [imageFile]);

  const onSubmit = async (e) => {
    setOpenAddRides(false);
    e.preventDefault();
    setIsRemoveImage(true);
    try {
      if (formData.category === "bike") {
        const AddRide = await addDoc(collection(db, "Add_Bikes"), {
          ...formData,
          imageUrl: uploadedImageUrl,
          timeStamp: serverTimestamp(),
        });
      } else {
        const AddRide = await addDoc(collection(db, "Add_Scooty"), {
          ...formData,
          imageUrl: uploadedImageUrl,
          timeStamp: serverTimestamp(),
        });
      }
      setIsRemoveImage(false);
      toast({
        title: "Ride Added Sucessfully!",
        // description: "To ID :" + AddRide.id,
      });
      // console.log("Add Ride Collection Id :", AddRide.id);
      setFormData(initialFormData);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "sorry" + err.message,
      });
      console.log("error", err);
    }
  };

  // const getData = async () => {
  //   const dataDb = await getDoc(collection(db, "Add_Rides"));
  //   // const valRef = collection(db, "Add_Rides");
  //   // const dataDb = await getDocs(valRef);
  //   const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
  //   setData(allData);
  //   console.log(dataDb);
  // };

  // useEffect(() => {
  //   getData();
  // });
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  if (imageFile) {
    const imageName = new Date().getTime() + imageFile.name;
    console.log("Image Name :", imageName);
  }

  //Get data from firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const BikeData = await getDocs(collection(db, "Add_Bikes"));
        const ScootyData = await getDocs(collection(db, "Add_Scooty"));
        const BikeList = BikeData.docs.map((doc) => doc.data());
        const ScootyList = ScootyData.docs.map((doc) => doc.data());
        console.log("Bikes", BikeList);
        console.log("Scooty", ScootyList);
        setBikes(BikeList);
        setScooty(ScootyList);
      } catch (error) {
        console.log("Error :", error);
        // setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end bg-whitesmoke">
        <Button className="" onClick={() => setOpenAddRides(true)}>
          Add New Rides
        </Button>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 "> */}
      <h1 className="text-gray-500 font-semibold text-2xl mb-2">Bikes :</h1>
      <div
        className="overflow-y-scroll flex flex-row gap-4 whitespace-nowrap w-full  
      no-scrollbar  mb-8
      "
      >
        {Bikes && Bikes.length > 0
          ? Bikes.map((RideDataItems) => (
              <AdminRideDataView
                setFormData={setFormData}
                setOpenAddRides={setOpenAddRides}
                setCurrentEditedId={setCurrentEditedId}
                rides={RideDataItems}
                // handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <h1 className="text-gray-500 font-semibold text-2xl mb-2">Scooty :</h1>
      <div
        className="overflow-y-scroll flex flex-row gap-4 whitespace-nowrap w-full  
      no-scrollbar  
      "
      >
        {Scooty && Scooty.length > 0
          ? Scooty.map((RideDataItems) => (
              <AdminRideDataView
                setFormData={setFormData}
                setOpenAddRides={setOpenAddRides}
                setCurrentEditedId={setCurrentEditedId}
                rides={RideDataItems}
                // handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={OpenAddRides}
        onOpenChange={() => {
          setOpenAddRides(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="flex items-start">
            <SheetTitle>Add New Rides</SheetTitle>
          </SheetHeader>
          <RidesImageUpload
            title="Upload Ride Image"
            folder="Add_Ride_Images"
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
            isRemoveImage={isRemoveImage}
          />
          <div className="py-6">
            <CommonForm
              formControls={addRides}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};
{
  /* <SheetFooter className="">
  <SheetClose asChild>
    <Button className="w-full" type="submit">
      Add
    </Button>
  </SheetClose>
</SheetFooter> */
}

export default AdminRides;
