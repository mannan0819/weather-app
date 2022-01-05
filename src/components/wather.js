import { useState } from "react";
import Search from "./search";
import Current from "./current";
import Box from "@mui/material/Box";

export function Weather() {
  const [location, setLocation] = useState("");
  const locationWrapper = (loc) => {
    setLocation(loc);
  };
  return (
    <Box>
      <Search setLoc={locationWrapper} />
      <Current loc={location} />
    </Box>
  );
}
