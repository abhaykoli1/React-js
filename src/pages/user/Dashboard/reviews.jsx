import { Container } from "react-bootstrap";
import { Button } from "@/components/ui/button";

import Bike from "../../../assets/Bike.jpg";
import {
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  Plus,
} from "lucide-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import { useContext, useEffect, useRef, useState } from "react";

// const ReviewsData = [
//   {
//     id: 1,
//     image: review1,
//     icon: "fas fa-clone",
//     name: "Vishal mihsra",
//     description:
//       "Lorem ipsum dolot, pisicing elit. Nobis, vel! AccusantiumNobis, vel! Accusantium hLorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium h Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
//   },
//   {
//     id: 2,
//     image: review1,
//     icon: "fas fa-snowflake",
//     name: "Sharad",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum conseq  olor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollituuntur, unde nam et mollitia eaque incidunt sed.",
//   },
//   {
//     id: 3,
//     image: review1,
//     name: "Khana",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
//   },
//   {
//     id: 4,
//     image: review1,
//     name: "Mohit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
//   },
//   {
//     id: 5,
//     image: review1,
//     name: "Abin",
//     description:
//       "Lorem ipsum adipt lauda cc et mollit  olor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitcusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
//   },
//   {
//     id: 6,
//     image: review1,
//     name: "Rohan",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
//   },
// ];

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { validate } from "uuid";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebaseConfig";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MyContext } from "@/Helper/context";

const initialReview = {
  review: "",
  avtar: "",
  userName: "",
  // letter: "",
};
function UserReviews() {
  const { reviewData } = useContext(MyContext);

  console.log("review Data :", reviewData);
  ///
  const { toast } = useToast();
  const swiperRef = useRef(null);
  const [Review, setReview] = useState(initialReview);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);
  console.log("user", userDetails);
  const [userName, setUserName] = useState("");
  console.log("Review", Review);
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };
  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const onSubmit = async (e) => {
    setOpen(false);
    e.preventDefault();
    try {
      const contactData = await addDoc(collection(db, "Reviews"), {
        ...Review,
        userName: userDetails.userName,
        avtar: userDetails.avtar,
        // letter: userDetails.avtar,
      });
      toast({
        title: "Review Added",
      });
      setReview(initialReview);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: err.message,
      });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userId = auth.currentUser.uid;
      // console.log("Autenticaton is :", isAuthenticated);
      console.log("user - Id :", userId);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // setUserDetails(docSnap.data());
        setUserDetails(docSnap.data());
        // console.log("UserData", docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  }, []);

  useEffect(() => {
    const isFormValid = () => {
      if (Review.review) {
        return true;
      } else {
        return false;
      }
    };
    setIsButtonDisabled(!isFormValid());
  }, [Review]);

  // const swiper = useSwiper();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <section
      id="reviews"
      className=" bg-whitesmoke 
      
      "
    >
      <div className="lg:pt-20 lg:pb-10 pt-16 bg-cover bg-top bg-[url('https://firebasestorage.googleapis.com/v0/b/auth-a50c2.appspot.com/o/Slider%2FBikeSlide1.jpg?alt=media&token=df644894-8b1d-4517-93d9-50950d503dfe')]">
        <div className="title-holder">
          <h2>Reviews</h2>
          <div className="subtitle text-gray mb-0">What our customer Says</div>
        </div>
        <Swiper
          ref={swiperRef}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 60,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          // pagination={false}
          modules={[EffectCoverflow, Autoplay, FreeMode]}
          freeMode={{
            // Free Mode options
            enabled: true, // Enable Free Mode
            momentum: true, // Enable momentum-based animation
            momentumRatio: 1, // Adjust the momentum ratio
            friction: 0.2, // Adjust the friction
          }}
          className="xl:py-24 lg:py-20 md:py-16 py-14"
          autoplay={{
            delay: 5000, // autoplay every 3 seconds
            disableOnInteraction: true, // autoplay will not be disabled after user interaction
          }}
        >
          {reviewData && reviewData.length > 0
            ? reviewData.map((view, index) => (
                <SwiperSlide
                  key={index}
                  className="flex gap-8 flex-col justify-between backdrop-blur-lg lg:border-[0.5px] text-white bg-whit xl:w-[40%] lg:w-[50%] md:w-[50%] sm:w-[70%] w-[80%] min-h-[300px]  shadow-2xl p-4 xl:mx-5 lg:mx-5 md:mx-3 rounded-[20px]"
                >
                  <p className="pb-4 text-lg text-pretty flex-1 justify-center text-ellipsis overflow-hidden">
                    {view.review}
                  </p>
                  <div className="-mb-1 flex relative items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={view.avtar}
                        alt="avtar"
                        className="z-10"
                      />
                      <div className="z-0 bg-white border text-black w-12 rounded-full flex justify-center items-center text-2xl">
                        {view.letter}
                      </div>
                    </Avatar>
                    <p className="pl-1 absolute -top-9 left-16  font-bold text-xl mt-5 mb-2">
                      {view.userName}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
        <div class="flex justify-center gap-10 mb-4 ">
          <div onClick={handlePrev}>
            <ChevronLeftIcon color="#fff" className="h-8 w-8 cursor-pointer " />
          </div>
          <div onClick={handleNext}>
            <ChevronRightIcon color="#fff" className="h-8 w-8 cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-center border-black h-11   rounded-full "
          >
            <Plus />
            <p className="pl-2 text-[16px]"> Add Yours</p>
          </Button>
        </div>
      </div>

      {/* Sheet */}
      <Sheet
        open={open}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <SheetContent
          side={"bottom"}
          className="backdrop-blur-sm  bg-whitesmoke border-0 rounded-t-xl"
        >
          <SheetHeader>
            <SheetTitle className="text-black">
              Add Your Review Here...
            </SheetTitle>
            <SheetDescription className="text-black">
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <Form className="mt-16" onSubmit={onSubmit}>
            <div className="grid gap-4 pt-4 pb-0">
              <Textarea
                id="name"
                value={Review.review}
                onChange={(event) =>
                  setReview({
                    ...Review,
                    review: event.target.value,
                  })
                }
                required
                className="row-span-6"
                placeholder="Your Review..."
              />
            </div>

            <SheetFooter>
              <div className="text-white">
                <Button
                  onClick={onSubmit}
                  disabled={isButtonDisabled}
                  variant="contained"
                  className="lg:w-60 md:w-full w-full hover:!text-white hover:!bg-[#555] text-lg"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </SheetFooter>
          </Form>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default UserReviews;
