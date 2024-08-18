import React, { useState, useEffect } from "react";

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
        setSpeed(50);
      } else if (isDeleting && index > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
        setSpeed(50);
      } else if (!isDeleting && index === text.length) {
        setIsDeleting(true);
        setSpeed(4000);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [text, index, isDeleting, speed]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
