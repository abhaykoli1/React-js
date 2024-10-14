import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import GoogleMapReact from "google-map-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsApp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const initialFormData = {
  Name: "",
  email: "",
  phone: "",
  comment: "",
};

function ContactForm() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { toast } = useToast();

  console.log("form", formData);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactData = await addDoc(collection(db, "ContactData"), {
        ...formData,
      });
      toast({
        title: "your request has been added Sucessfully!",
        description: "We will call you in after some time",
      });
      console.log("Collection Id :", contactData.id);
      setFormData(initialFormData);
    } catch (err) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "sorry" + err.message,
      });
      console.log("error", err);
    }
  };
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;
    const isFormValid = () => {
      if (
        formData.Name &&
        emailRegex.test(formData.email) &&
        phoneRegex.test(formData.phone) &&
        formData.comment
      ) {
        return true;
      } else {
        return false;
      }
    };
    setIsButtonDisabled(!isFormValid());
  }, [formData]);

  return (
    <section
      id="contact"
      className=" pb-12 flex items-center justify-center bg-transparent pt-16 "
    >
      <div className="lg:container  flex-col flex-1">
        {/* lg:mx-5 md:mx-10 sm:mx-5 mx-2 */}
        <div className="  py-10   mx-3 lg:bg-white  backdrop-blur-lg lg:shadow-lg md:bg-whitesmoke rounded-md lg:px-5">
          <div className="title-holder">
            <h2>Contact us</h2>
            <div className="subtitle">get connected with us</div>
          </div>
          <div class="grid md:grid-cols-1 sm:grid-cols-1 gap-4 lg:grid-cols-2">
            <span className="flex-col gap-5">
              <div className="text-sm flex gap-2 mb-3">
                <MapPin />
                <span>
                  Location: Royal Brothers560/1, Boomi Plaza, 4th and 5th Floor,
                  4th Cross, CMH Road,
                </span>
              </div>
              <div className="text-sm flex gap-2 mb-3">
                {" "}
                <Phone />
                <span>Call : +917799019595595</span>
              </div>
              <div className="text-sm flex gap-2 mb-3">
                {" "}
                <WhatsApp />
                Chat : Chat now Get QR Code
              </div>
              <div className="text-sm flex gap-2 mb-3">
                <Mail />
                Mail : Enquiries - support@royalbrothers.com
              </div>
            </span>
            <span className="h-52">
              {/* <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>{" "} */}
              <div className="google-map ">
                <iframe
                  title="map"
                  className="w-full h-52 ring-1 ring-black"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14048.211570060965!2d-0.1228208876550775!3d51.505942908931324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1481805868782"
                ></iframe>
              </div>
            </span>
          </div>

          <Form className="mt-16" onSubmit={onSubmit}>
            <div class="grid md:grid-cols-1 sm:grid-cols-1 lg:gap-3 lg:grid-cols-3">
              <Col>
                <Input
                  className="h-12 mb-2"
                  type="text"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      Name: event.target.value, // Use 'phone' as the key
                    })
                  }
                  required
                />
              </Col>

              <Col>
                <Input
                  className="h-12 mb-2"
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      phone: event.target.value, // Use 'phone' as the key
                    })
                  }
                  required
                />
              </Col>
              <Col>
                <Input
                  className="h-12 mb-2"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      email: event.target.value, // Use 'phone' as the key
                    })
                  }
                  required
                />
              </Col>
            </div>
            <div className="mb-2">
              <Textarea
                className=""
                as="textarea"
                placeholder="Comment"
                value={formData.comment}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    comment: event.target.value, // Use 'phone' as the key
                  })
                }
                required
              />
            </div>
            <div className="text-center">
              <div className="text-white ">
                <Button
                  disabled={isButtonDisabled}
                  variant="contained"
                  className="lg:w-60 md:w-full w-full hover:text-black hover:bg-white text-lg"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;

{
  /* <div className="google-map">
  <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14048.211570060965!2d-0.1228208876550775!3d51.505942908931324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1481805868782"></iframe>
</div>
<Container fluid>
  padding: 70px 40px 0; position: relative; z-index: 1; font-size: 18px;
  border-radius: 5px;
  relative px-40 py-52 z-1 size-16 rounded-sm
 
</Container> */
}
