import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Paper from "@mui/material/Paper";

export default function PostJob() {
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [minExp, setMinExp] = useState(0);
  const [maxExp, setMaxExp] = useState("");
  const [category, setCategory] = useState("");
  const [functionArea, setFunctionalArea] = useState("");
  const [minGradYear, setMinGradYear] = useState("");
  const [maxGradYear, setMaxGradYear] = useState("");
  const [tagString, setTagString] = useState("");

  const temp = [1, 2, 3, 4, 5, 6, 7, 8];
  const temp2 = [1, 2, 3, 4];

  const fetchAllCities = async () => {
    const body = { country: "India" };
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body),
      }
    );

    const result = await res.json();
    result.data.push("Remote Only", "Hybrid");
    setCity(result.data);
  };

  const postJob = () => {};

  useEffect(() => {
    fetchAllCities();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h6" gutterBottom>
            Post Job
          </Typography>
          <Typography variant="h5" color="#45b4b7" gutterBottom>
            Basic Details
          </Typography>
          <hr></hr>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-textarea"
                label="Job Title *"
                placeholder="Write a title that appropriately describes this job"
                multiline
                fullWidth
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={city}
                value={selectedCity}
                onChange={(e, value) => setSelectedCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Location *"
                    placeholder="+ Add Location"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: "0rem" }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Min Years of Experience *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={minExp}
                  label="Min Years of Experience *"
                  onChange={(e) => setMinExp(e.target.value)}
                >
                    {temp.map((value,idx) => {
                      return (
                        <MenuItem key={value-1} value={idx}>
                          {idx}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Max Years of Experience *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={maxExp}
                  label="Max Years of Experience *"
                  onChange={(e) => setMaxExp(e.target.value)}
                >
                  {minExp != -1 &&
                    temp.map((value) => {
                      return (
                        <MenuItem key={value} value={value + minExp}>
                          {value + minExp}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id="filled-multiline-static"
                label="Job Description *"
                placeholder="Describe the roles and responsibilities, skills required for the job and help candidates understand the role better"
                multiline
                rows={4}
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
          <Typography variant="h5" color="#45b4b7" marginTop={5} gutterBottom>
            Targetting
          </Typography>
          <hr></hr>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Category *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category *"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"Technical support"}>
                    Technical support
                  </MenuItem>
                  <MenuItem value={"Project manager"}>Project manager</MenuItem>
                  <MenuItem value={"Technical consultant"}>
                    Technical consultant
                  </MenuItem>
                  <MenuItem value={"Business analyst"}>
                    Business analyst
                  </MenuItem>
                  <MenuItem value={"Web developer"}>Web developer</MenuItem>
                  <MenuItem value={"Software tester"}>Software tester</MenuItem>
                  <MenuItem value={"Technical sales"}>Technical sales</MenuItem>
                  <MenuItem value={"Network engineer"}>
                    Network engineer
                  </MenuItem>
                  <MenuItem value={"Systems analyst"}>Systems analyst</MenuItem>
                  <MenuItem value={"Software engineer"}>
                    Software engineer
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Functional Area *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={functionArea}
                  label="Functional Area *"
                  onChange={(e) => setFunctionalArea(e.target.value)}
                >
                  <MenuItem value={"Full Time"}>Full Time</MenuItem>
                  <MenuItem value={"Part Time"}>Part Time</MenuItem>
                  <MenuItem value={"Temporary"}>Temporary</MenuItem>
                  <MenuItem value={"Intern"}>Intern</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: "0rem" }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Min Graduating Year *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={minGradYear}
                  label="Min Graduating Year *"
                  onChange={(e) => setMinGradYear(e.target.value)}
                >
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Max Graduating Year *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={maxGradYear}
                  label="Max Graduating Year *"
                  onChange={(e) => setMaxGradYear(e.target.value)}
                >
                  {minGradYear != "" &&
                    temp2.map((value) => {
                      return (
                        <MenuItem value={value + minGradYear}>
                          {value + minGradYear}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={tagString}
                onChange={(e) => setTagString(e.target.value)}
                fullWidth
                variant="standard"
                label="Tags"
                placeholder="+ Add Comma Separated Tags"
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: "1rem" }}>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                style={{ backgroundColor: "#1f8f75" }}
              >
                Post Job
              </Button>
              <Button
                variant="outlined"
                style={{ color: "#1f8f75", borderColor: "#1f8f75" }}
              >
                Post and add Another Job
              </Button>
              <Button variant="text">Cancel</Button>
            </Stack>
          </div>
        </Paper>
      </Container>
    </>
  );
}
