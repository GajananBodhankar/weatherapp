import axios from "axios";
import { useState } from "react";

function handleChange(e, setSearch) {
  setSearch(e.target.value);
}
function CustomSearch() {
  const [search, setSearch] = useState<string>("");
  return { search, setSearch };
}

function CustomData() {
  const [data, setData] = useState();
  return { data, setData };
}

function CustomError() {
  const [error, setError] = useState("");
  return { error, setError };
}

async function apicall(city, setData, setError) {
  try {
    let response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=b6cc8381efd2453f99c74520243001&q=${city}&aqi=no`
    );
    if (response) {
      setError("");
      setData(response.data);
    }
  } catch (e) {
    setError("No matching Location found");
    setData(undefined);
  }

  //  OR
  // let response = await fetch(
  //   `http://api.weatherapi.com/v1/current.json?key=b6cc8381efd2453f99c74520243001&q=${city}&aqi=no`
  // );
  // if (response.status == 400) {
  //   console.log("error");
  // } else {
  //   let data = await response.json();
  //   console.log(data);
  // }
}

export { handleChange, CustomSearch, CustomData, apicall, CustomError };
