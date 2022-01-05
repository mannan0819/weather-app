import { Box, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { apiKey, currApi } from "../constants";

export default function Current(props) {
  const [weather, setWeather] = useState("");
  const [units, setUnits] = useState("C");

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
    if (props.loc === null || props.loc === "") setWeather("");
    else getWeather();
  }, [props.loc]);

  return (
    <Box>
      {weather && weather.current && (
        <Box>
          <Box sx={{ display: "flex" }}>
            <h3>{props.loc}</h3>
            <Box ml={5} mt={2}>
              <Link
                component="button"
                underline={units === "C" ? "none" : "always"}
                onClick={() => {
                  setUnits("C");
                }}
              >
                °C
              </Link>
              {" | "}
              <Link
                component="button"
                underline={units === "F" ? "none" : "always"}
                onClick={() => {
                  setUnits("F");
                }}
              >
                {" "}
                °F
              </Link>
            </Box>
          </Box>
          <Box mt={-2} ml={1}>
            Updated on {weather.current.last_updated}
          </Box>

          <Box sx={{ display: "flex" }}>
            {/*WEATHER TEMP AND ICON*/}
            <Box sx={{ display: "flex" }}>
              <Box className="temp">
                {units === "C"
                  ? Math.round(weather.current.temp_c)
                  : Math.round(weather.current.temp_f)}
              </Box>
              <Box>
                <Box className="temp-units">{units === "C" ? "°C" : "°F"}</Box>
                <Box sx={{ display: "flex" }}>
                  <Box className="feels-like">
                    FEELS <br />
                    LIKE:
                  </Box>
                  <Box className="feels-like-temp">
                    {units === "C"
                      ? Math.round(weather.current.feelslike_c)
                      : Math.round(weather.current.feelslike_f)}
                  </Box>
                </Box>
                <Box ml={-3}>{weather.current.condition.text}</Box>
              </Box>
              <Box mt={-1}>
                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                  width={80}
                />
              </Box>
            </Box>

            <Box mt={1} ml={4}>
              <Box sx={{ display: "flex" }}>
                Wind:{" "}
                {units === "C"
                  ? weather.current.wind_kph
                  : weather.current.wind_mph}{" "}
                <Box ml={0.8} className="wind-dir">
                  {weather.current.wind_dir} <br />
                  <Box mt={-0.2}>{units === "C" ? "kph" : "mph"}</Box>
                </Box>
              </Box>
              <Box>Humidity: {weather.current.humidity}%</Box>
              <Box>
                Gust:{" "}
                {units === "C"
                  ? weather.current.gust_kph
                  : weather.current.gust_mph}{" "}
                {units === "C" ? "kph" : "mph"}
              </Box>
              <Box>
                Precip:{" "}
                {units === "C"
                  ? weather.current.precip_mm
                  : weather.current.precip_in}{" "}
                {units === "C" ? "mm" : "in"}
              </Box>
              <Box>
                Pressure:{" "}
                {units === "C"
                  ? weather.current.pressure_mb
                  : weather.current.pressure_in}{" "}
                {units === "C" ? "mb" : "in"}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* <ul className="no-bullets">
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
      </ul> */}
    </Box>
  );
}
