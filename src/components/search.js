import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { apiKey, searchApi } from "../constants";

export default function Search(props) {
  const [searchRes, setSearchRes] = useState([]);
  const [lookupVal, setLookupVal] = useState("");

  const getWeather = async () => {
    try {
      const api = searchApi + lookupVal + "&" + apiKey;
      await fetch(api)
        .then((response) => response.json())
        .then((data) => {
          setSearchRes(data);
        });
    } catch (err) {
      setSearchRes(null);
      console.log("Bad Request");
    }
  };

  useEffect(() => {
    if (lookupVal.length >= 3) getWeather();
    else {
      setSearchRes([]);
    }
  }, [lookupVal]);

  return (
    <div>
      <Autocomplete
        id="location"
        onChange={(event, value) => {
          props.setLoc(value);
        }}
        freeSolo
        options={searchRes.map(
          (option) => option.name + ", " + option.region + ", " + option.country
        )}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            label="Location"
            value={lookupVal}
            onChange={(e) => {
              setLookupVal(e.target.value);
            }}
            {...params}
          />
        )}
      />
    </div>
  );
}
