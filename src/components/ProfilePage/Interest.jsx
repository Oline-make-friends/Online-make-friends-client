import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../../assets/img/color-sharp.png";
import { Box } from "@chakra-ui/react";

export const Interest = ({ user }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box className="skill" id="skills" color="white">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Interest</h2>
              <p>These are the things that I'm interest</p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                <div className="item">
                  <h5>Web Development</h5>
                </div>

                {user?.interrests?.map((interest, index) => {
                  return (
                    <div
                      className="item"
                      key={index}
                      style={{ color: "white" }}
                    >
                      <h5>{interest}</h5>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="pic" />
    </Box>
  );
};
