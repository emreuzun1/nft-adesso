import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const BasicCarousel = () => {
  const [imgCounter, setImgCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgCounter((counter) => {
        if (counter === 14) return 0;
        return counter + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <img src={`${imgCounter}.png`} alt="NFT's" />
    </Box>
  );
};

export default BasicCarousel;
