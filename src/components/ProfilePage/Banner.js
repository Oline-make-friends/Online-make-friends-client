import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../../assets/img/header-img.svg";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { Box, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const Banner = ({ user }) => {
  const currentUser = useSelector((state) => state.auth?.login.currentUser);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  // const [index, setIndex] = useState(1);
  const toRotate = ["Ho Chi Minh city", "K14", "FPT Student"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      // setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      // setIndex(1);
      setDelta(500);
    } else {
      // setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home" style={{ color: "white" }}>
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome to my Profile</span>
                  <h1>
                    {`I'm ${user?.fullname}`}{" "}
                    <span
                      className="txt-rotate"
                      dataPeriod="1000"
                      data-rotate='[ "FPT Student", "Web porfolio", "Profile" ]'
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <Text as="bold">Gender: {user?.gender}</Text>
                  <p>{user?.about}</p>
                  {currentUser?._id === user?._id ? (
                    <></>
                  ) : (
                    <button onClick={() => console.log("connect")}>
                      Add friend <ArrowRightCircle size={25} />
                    </button>
                  )}

                  <br></br>
                  <Box boxSize="sm">
                    <Image src={user?.avatar_url} alt="User avatar" />
                  </Box>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
