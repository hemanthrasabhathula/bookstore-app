import { Button, Card, Container, Row } from "react-bootstrap";
import "./BookLines.css";
import { useState } from "react";

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
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2;
    do {
      color2 = colors[Math.floor(Math.random() * colors.length)];
    } while (color2 === color1);
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };

  const [gradient, setGradient] = useState(generateRandomGradient());

  const changeGradient = () => {
    setGradient(generateRandomGradient());
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
              <Card.Text>
                "Some quick example text to build on the card title and make up
                the bulk of the card's content."
              </Card.Text>
              <Card.Text style={{ textAlign: "end" }}>
                Page 18 | Chapter 3
              </Card.Text>
              <Button onClick={changeGradient}>Change Background</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default BookLines;
