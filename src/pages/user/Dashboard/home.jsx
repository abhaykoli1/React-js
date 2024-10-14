import { Carousel, Container, Image } from "react-bootstrap";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { MyContext } from "@/Helper/context";
import Pick_Drop from "@/components/user-view/pickUp_DropOff";
import { Input } from "@/components/ui/input";
function Home() {
  const { Slide } = useContext(MyContext);
  // console.log("Slider Images :", Slide);

  return (
    <section
      id="home"
      // lg:mt-[70px] md:mt-[70px] sm:mt-[70px] mt-[53px]
      className="bg-[#333]  2xl:h-[900px] xl:h-[800px] lg:h-[650px] md:h-[500px] sm:h-[400px] flex items-center justify-center"
    >
      <Carousel
        autoPlay={true}
        interval={2500}
        controls={false}
        className="overflow-x-hidden w-screen "
      >
        {Slide.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <div className=" 2xl:h-[900px] xl:h-[800px] lg:h-[650px] md:h-[500px] sm:h-[400px] w-screen   ">
                <img
                  className="d-block w-100 filter brightness-75 "
                  src={Slide[index]}
                  alt=""
                />
              </div>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className=" flex-col flex-1 absolute lg:top-20 md:top-16 sm:top-16 top-12 left-0 right-0 g-red-200 ">
        <div
          id="Content"
          className=" container text-center lg:mt-14 sm:mt-10  "
        >
          <h1
            id="HomeTitle"
            className="text-white font-extrabold xl:text-[5vw] lg:text-[5vw] md:text-[7vw] "
          >
            Book Your Ride ASAP!!
          </h1>
          <h1
            id="HomeSubtitle"
            className="flex text-center font-bold text-xl text-white -mb-7"
          >
            Upto 30% Discount with Welcome Bonus
          </h1>
        </div>

        <div className="flex  justify-center">
          <div className="lg:container lg:flex md:hidden hidden lg:gap-3 xl:gap-20 px-4 items-center rounded-2xl  2xl:h-[670px] xl:h-[430px] lg:h-[350px] md:h-[260px] sm:h-[190px]  mt-10 ">
            <h1 className=" flex-[0.5] font-bold 2xl:text-[3.5vw] xl:text-[4.5vw] lg:text-[5vw] md:text-[5vw] text-white py-6">
              {/* Upto 30% Discount with Welcome Bonus */}
            </h1>
            <div className="flex-[0.5]">
              <Pick_Drop />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
