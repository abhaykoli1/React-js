import { createContext, useEffect, useState } from "react";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { collection, getDocs } from "firebase/firestore";

const MyContext = createContext();

const AssetsProvider = ({ children }) => {
  const [reviewData, setReviewData] = useState({});
  const [userData, setUserData] = useState({});

  const [sliderImages, setSliderImages] = useState([]);
  console.log("user :", userData);

  const [isLoading, setIsLoading] = useState(true);
  const [Slide, setSlide] = useState([]);
  // console.log("Slide Image :", Slide);

  const [openAuth, setOpenAuth] = useState();
  useEffect(() => {
    fetchAllImages().then((SlidesUrls) => {
      setSlide(SlidesUrls);
      setIsLoading(false);
    });
  }, []);

  const fetchAllImages = async () => {
    const slidesRef = ref(storage, "Slider");
    try {
      const SlideList = await listAll(slidesRef);
      const SlidesUrls = await Promise.all(
        SlideList.items.map((slidesRef) => getDownloadURL(slidesRef))
      );
      return SlidesUrls;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  // // Get data from firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Data = await getDocs(collection(db, "AddSliderImagesData"));
        const ImageData = Data.docs.map((doc) => doc.data());
        setSliderImages(ImageData);
        console.log("Image data", ImageData);

        //ReviewData
        const Data1 = await getDocs(collection(db, "Reviews"));
        const review = Data1.docs.map((doc) => doc.data());
        setReviewData(review);
        console.log("Review", review);

        const Data2 = await getDocs(collection(db, "Users"));
        const user = Data2.docs.map((doc) => doc.data());
        setUserData(user);
        console.log("user", user);
      } catch (error) {
        console.log("Error :", error);
      }
    };
    fetchData();
  }, []);

  const callFunction2 = (value) => {
    setOpenAuth(value);
    console.log("value", value);
  };
  return (
    <MyContext.Provider
      value={{
        Slide,
        sliderImages,
        reviewData,
        userData,
        openAuth,
        callFunction2,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { AssetsProvider, MyContext };
