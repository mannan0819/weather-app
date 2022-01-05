export const apiUrl = "http://api.weatherapi.com/v1/";
export const currentLookup = "current.json?q=";
export const searchLookup = "search.json?q=";
export const apiKey = "key=" + process.env.REACT_APP_WEATHER_API_KEY;
export const searchApi = apiUrl + searchLookup;
export const currApi = apiUrl + currentLookup;
