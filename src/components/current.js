import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { apiKey, currApi } from "../constants";

export default function Current(props) {
  const [weather, setWeather] = useState("");

  const getWeather = async () => {
    await fetch(currApi + props.loc + "&" + apiKey)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((err) => {
        setWeather(null);
      });
  };

  useEffect(() => {
    getWeather();
  }, [props.loc]);

  return (
    <>
      {weather && weather.current && (
        <Box
          sx={{
            display: "grid",
            gridAutoColumns: "1fr",
            gap: 1,
          }}
        >
          <Box sx={{ gridRow: "1", gridColumn: "span 2" }}>
            <Box>
              <h3>{props.loc}</h3>
            </Box>
            <Box mt={-2} ml={1}>
              last_updated: {weather.current.last_updated}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box className="temp">{Math.round(weather.current.temp_c)}</Box>
              <Box>
                <Box className="temp-units">°C</Box>
                <Box sx={{ display: "flex" }}>
                  <Box className="feels-like">
                    FEELS <br />
                    LIKE:
                  </Box>
                  <Box className="feels-like-temp">
                    {Math.round(weather.current.feelslike_c)}
                  </Box>
                </Box>
              </Box>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
              {/* <Conditions
                text={weather.current.condition.text}
                icon={weather.current.condition.icon}
              /> */}
            </Box>
            {weather.current.condition.text}
            <Box m={1}>last_updated: {weather.current.last_updated}</Box>
          </Box>
          <Box sx={{ gridRow: "1", gridColumn: "3 / 5" }} mt={8} ml={-80}>
            <Box>Temperature: {weather.current.temp_c} C</Box>
            <Box>Feels Like: {weather.current.feelslike_c} C</Box>
            <Box>Wind: {weather.current.wind_kph} KPH</Box>
          </Box>
        </Box>
      )}

      <ul className="no-bullets">
        {weather &&
          weather.current &&
          Object.entries(weather.current).map(([key, val]) => {
            if (key === "condition") return <></>;
            return (
              <li key={key}>
                {key}:{val}
              </li>
            );
          })}
      </ul>
    </>
  );
}
