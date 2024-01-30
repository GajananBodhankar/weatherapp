import {
  AppBar,
  Avatar,
  Box,
  Stack,
  TextField,
  Typography,
  createStyles,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./styles.tsx";
import {
  CustomData,
  CustomError,
  CustomSearch,
  apicall,
  handleChange,
} from "./components.tsx";
import data from "./response.tsx";

function Weather() {
  const match = useMediaQuery("(max-width:768px)");
  const { search, setSearch } = CustomSearch();
  const { data, setData } = CustomData();
  const { error, setError } = CustomError();
  useEffect(() => {
    let timer;
    if (search.length > 0) {
      timer = setTimeout(() => {
        apicall(search, setData, setError);
      }, 1000);
    } else {
      setError("");
      setData(undefined);
    }
    return () => clearTimeout(timer);
  }, [search]);
  return (
    <Box
      component={"div"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <AppBar position="relative" enableColorOnDark sx={styles.appColor}>
        <Typography
          textAlign={"center"}
          fontWeight={700}
          fontSize={match ? 22 : 28}
          padding={1}
        >
          Weather App
        </Typography>
      </AppBar>
      <TextField
        variant="outlined"
        label="Enter Location"
        sx={styles.textStyle}
        value={search}
        onChange={(e) => handleChange(e, setSearch)}
      />
      {data ? (
        <>
          <Typography
            fontSize={match ? 28 : 38}
            fontWeight={"bold"}
            marginTop={match ? "10px" : "20px"}
            textAlign={"center"}
          >
            {data.location.name + ", " + data.location.country}
          </Typography>
          <Stack
            border={"2px solid black"}
            width={match ? "70%" : "30%"}
            maxWidth={match ? "70%" : "40%"}
            marginTop={match ? "10px" : "30px"}
            padding={1}
          >
            <Box
              component={"img"}
              src="1159072.png"
              sx={{
                height: 100,
                width: 100,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
            />
            <Box>
              <Box
                component={"div"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>Temperature</Typography>
                <Typography>
                  {data.current.temp_c}
                  <sup style={{ fontSize: "10px" }}>o</sup>C /{" "}
                  {data.current.temp_f}
                  <sup style={{ fontSize: "10px" }}>o</sup>F
                </Typography>
              </Box>
              <Box
                component={"div"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>Condition</Typography>
                <Typography>{data.current.condition.text}</Typography>
              </Box>
              <Box
                component={"div"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>Wind Speed</Typography>
                <Typography>{data.current.wind_kph} km/h</Typography>
              </Box>
              <Box
                component={"div"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>Humidity</Typography>
                <Typography>{data.current.humidity}%</Typography>
              </Box>
              <Box
                component={"div"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>Cloud Coverage</Typography>
                <Typography>{data.current.cloud}%</Typography>
              </Box>
              <Box
                component={"div"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>Last Updated</Typography>
                <Typography textAlign={"end"}>
                  {data.current.last_updated}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </>
      ) : (
        <Typography color={"red"}>{error}</Typography>
      )}
    </Box>
  );
}

export default Weather;
