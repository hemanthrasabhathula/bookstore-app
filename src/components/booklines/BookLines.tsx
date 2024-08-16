import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./BookLines.css";
import { useState } from "react";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrowCurve } from "../../assets/arrow-right-curve.svg";
import { ReactComponent as LeftArrowCurve } from "../../assets/arrow-left-curve.svg";
import CircularButton from "../common/CircularButton";

const bookQuotes = [
  {
    quote:
      "It's the possibility of having a dream come true that makes life interesting.",
    page: "11",
    chapter: "1",
  },
  {
    quote:
      "And, when you want something, all the universe conspires in helping you to achieve it.",
    page: "22",
    chapter: "2",
  },
  {
    quote:
      "When you possess great treasures within you and try to tell others of them, seldom are you believed.",
    page: "42",
    chapter: "4",
  },
  {
    quote: "There is only one way to learn. It’s through action.",
    page: "67",
    chapter: "5",
  },
  {
    quote:
      "When we strive to become better than we are, everything around us becomes better too.",
    page: "99",
    chapter: "7",
  },
  {
    quote:
      "Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.",
    page: "109",
    chapter: "8",
  },
  {
    quote:
      "Remember that wherever your heart is, there you will find your treasure.",
    page: "123",
    chapter: "9",
  },
  {
    quote:
      "The secret of life, though, is to fall seven times and to get up eight times.",
    page: "137",
    chapter: "10",
  },
  {
    quote:
      "Tell your heart that the fear of suffering is worse than the suffering itself.",
    page: "146",
    chapter: "11",
  },
  {
    quote:
      "The simple things are also the most extraordinary things, and only the wise can see them.",
    page: "158",
    chapter: "12",
  },
  {
    quote:
      "Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them.",
    page: "4",
    chapter: "1",
  },
  {
    quote:
      "All grown-ups were once children... but only few of them remember it.",
    page: "5",
    chapter: "1",
  },
  {
    quote: "It is such a mysterious place, the land of tears.",
    page: "28",
    chapter: "7",
  },
  {
    quote:
      "One sees clearly only with the heart. Anything essential is invisible to the eyes.",
    page: "63",
    chapter: "21",
  },
  {
    quote:
      "It is the time you have wasted for your rose that makes your rose so important.",
    page: "64",
    chapter: "21",
  },
  {
    quote:
      "The most beautiful things in the world cannot be seen or touched, they are felt with the heart.",
    page: "65",
    chapter: "21",
  },
  {
    quote: "You become responsible, forever, for what you have tamed.",
    page: "67",
    chapter: "21",
  },
  {
    quote: "What makes the desert beautiful is that somewhere it hides a well.",
    page: "85",
    chapter: "24",
  },
  {
    quote: "But the eyes are blind. One must look with the heart.",
    page: "86",
    chapter: "25",
  },
  {
    quote:
      "You - you alone will have the stars as no one else has them... In one of the stars I shall be living. In one of them I shall be laughing.",
    page: "92",
    chapter: "26",
  },
];

const BookLines = () => {
  //   const [bgImage, setBgImage] = useState(
  //     "linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)"
  //   );

  //   const handleBgChange = () => {
  //     setBgImage((prevImage) =>
  //       prevImage ===
  //       "linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)"
  //         ? "linear-gradient(to right, #00c9ff, #00dbf8, #00eae2, #41f6c2, #92fe9d)"
  //         : "linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)"
  //     );
  //   };
  const [count, setcount] = useState(0);
  const generateRandomGradient = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F333FF",
      "#FF33A5", // Existing
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
      "#F7CAC9",
      "#92A8D1", // Additional
      "#D64161",
      "#FFDDC1",
      "#6B4226",
      "#D9BF77",
      "#D5AAFF", // Additional
      "#FFABAB",
      "#FFC3A0",
      "#B9FBC0",
      "#B9E3C6",
      "#FFE156", // Additional
      "#F5B9B2",
      "#F0E5CF",
      "#C9B4A5",
      "#A2A2A2",
      "#B0A7A3", // Additional
    ];

    const colors2 = [
      "#F9DBBA",
      "#5B99C2",
      "#F7EFE5",
      "#E2BFD9",
      "#C8A1E0",
      "#674188",
      "#FFDFD6",
      "#E3A5C7",
      "#B692C2",
      "#694F8E",
      "#FEFAF6",
      "#EADBC8",
      "#102C57",
      "#F5EEE6",
      "#FFF8E3",
      "#F3D7CA",
      "#E6A4B4",
      "#BC9F8B",
      "#B5CFB7",
      "#CADABF",
      "#E7E8D8",
      "#987D9A",
      "#BB9AB1",
      "#CDFADB",
      "#FF8080",
      "#FFFBF5",
      "#DAC0A3",
      "#E78895",
      "#74512D",
      "#8E7AB5",
    ];
    const color1 = colors2[Math.floor(Math.random() * colors2.length)];
    let color2;
    do {
      color2 = colors2[Math.floor(Math.random() * colors2.length)];
    } while (color2 === color1);
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };

  const [gradient, setGradient] = useState(generateRandomGradient());

  const changeGradient = () => {
    setGradient(generateRandomGradient());
  };

  const handleNext = () => {
    if (count + 1 > bookQuotes.length - 1) {
      setcount(0);
    } else {
      setcount(count + 1);
    }
    changeGradient();
  };

  const handlePrev = () => {
    if (count - 1 < 0) {
      setcount(bookQuotes.length - 1);
    } else {
      setcount(count - 1);
    }
    changeGradient();
  };

  return (
    <div
      className="book-lines-bg"
      style={{
        background: gradient,
      }}
    >
      <Container>
        <Row className="justify-content-center" style={{ padding: "5px" }}>
          <Card className="card-frost" style={{ width: "34rem" }}>
            <Card.Body>
              <Card.Text
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "Georgia, serif",
                  textWrap: "pretty",
                }}
              >
                <i>
                  " {bookQuotes[count].quote}"
                  {/* "Some quick example text to build on the card title and make
                  up the bulk of the card's content." */}
                </i>
              </Card.Text>
              <Card.Text style={{ textAlign: "end", fontSize: "12px" }}>
                {`Page ${bookQuotes[count].page} | Chapter ${bookQuotes[count].chapter}`}
              </Card.Text>
              {/* <Button >Change Background</Button> */}
            </Card.Body>
          </Card>
        </Row>
        <Row className="justify-content-center mt-1" style={{ padding: "5px" }}>
          <Col
            lg="auto"
            sm="auto"
            md="auto"
            xs="auto"
            className="align-content-center"
          >
            <Button
              variant="dark"
              onClick={handlePrev}
              style={{
                borderRadius: "50%",
                border: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                padding: "0",
                margin: "0",
                background: "transparent",
              }}
            >
              <LeftArrowCurve style={{ width: "46px", height: "46px" }} />
            </Button>
          </Col>
          <Col
            lg="auto"
            sm="auto"
            md="auto"
            xs="auto"
            className="align-content-center"
          >
            <Button
              variant="dark"
              onClick={handleNext}
              style={{
                borderRadius: "50%",
                border: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                padding: "0",
                margin: "0",
                background: "transparent",
              }}
            >
              <RightArrowCurve style={{ width: "46px", height: "46px" }} />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookLines;
