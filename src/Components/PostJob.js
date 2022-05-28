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
import Alert from "@mui/material/Alert";

import Paper from "@mui/material/Paper";

export default function PostJob() {
  const [city, setCity] = useState([]);
  const [title, setTitle] = useState("");
  const [jobDesciption, setJobDesciption] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [minExp, setMinExp] = useState(0);
  const [maxExp, setMaxExp] = useState("");
  const [category, setCategory] = useState("");
  const [functionArea, setFunctionalArea] = useState("");
  const [minGradYear, setMinGradYear] = useState("");
  const [maxGradYear, setMaxGradYear] = useState("");
  const [tagString, setTagString] = useState("");
  const [error, setError] = useState("");
  const [errorState, setErrorState] = useState("");

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

  const setAllFieldsBlank = () => {
    setTitle("");
    setCategory("");
    setSelectedCity([]);
    setFunctionalArea("");
    setJobDesciption("");
    setMinExp(0);
    setMaxExp("");
    setMinGradYear("");
    setMaxGradYear("");
    setTagString("");
  };

  const handleCancel = () => {
    setAllFieldsBlank();
    setErrorState("success");
    setError("Cancelled Job Posting");
    setTimeout(() => {
      setError("");
      setErrorState("");
    }, 2000);
  };

  const postJob = () => {
    if (
      title == "" ||
      jobDesciption == "" ||
      selectedCity == [] ||
      maxExp == "" ||
      category == "" ||
      functionArea == "" ||
      minGradYear == "" ||
      maxGradYear == "" ||
      tagString == ""
    ) {
      setErrorState("error");
      setError("Please Enter All Details");

      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    let tags = tagString;
    tags = tags.trim();
    let tagsArr = tags.split(",");
    tagsArr = tagsArr.map((value) => {
      return value.trim();
    });

    let body = {
      jobTitle: title,
      location: selectedCity,
      minYearExperience: minExp,
      maxYearExperience: maxExp,
      jobDescription: jobDesciption,
      category: category,
      functionalArea: functionArea,
      minGraduatingYear: minGradYear,
      maxGraduatingYear: maxGradYear,
      tags: tagsArr,
    };

    // let res = fetch('http://localhost:8001/v1jobs/job',{
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json;charset=utf-8" },
    //     body: JSON.stringify(body),
    // })

    console.log(body);
    setErrorState("success");
    setError("Job Posted Successfully");
    setTimeout(() => {
      setError("");
    }, 2000);

    setAllFieldsBlank();
  };

  useEffect(() => {
    fetchAllCities();
  }, []);

  const postJobAndAddAnotherJob = () => {
    postJob();
    //   if(errorState != 'error'){
    //     setError('Now you can add another Job');
    //     setErrorState('info');
    //     setTimeout(() => {
    //         setError("");
    //     }, 2000);
    //   }
  };

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
          {error != "" && <Alert severity={errorState}>{error}</Alert>}
          <hr></hr>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="job_title"
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
                id="location_city"
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
                <InputLabel id="min_year_exp">
                  Min Years of Experience *
                </InputLabel>
                <Select
                  labelId="min_year_exp"
                  id="min_year_exp_dropdown"
                  value={minExp}
                  label="Min Years of Experience *"
                  onChange={(e) => setMinExp(e.target.value)}
                >
                  {temp.map((value, idx) => {
                    return (
                      <MenuItem key={value - 1} value={idx}>
                        {idx}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="max_year_exp">
                  Max Years of Experience *
                </InputLabel>
                <Select
                  labelId="max_year_exp"
                  id="max_year_exp_dropdown"
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
                value={jobDesciption}
                onChange={(e) => setJobDesciption(e.target.value)}
                id="job_description"
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
                <InputLabel id="category">
                  Category *
                </InputLabel>
                <Select
                  labelId="category"
                  id="category_dropdown"
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
                <InputLabel id="functional_area">
                  Functional Area *
                </InputLabel>
                <Select
                  labelId="functional_area"
                  id="functional_area_dropdown"
                  value={functionArea}
                  label="Functional Area *"
                  onChange={(e) => setFunctionalArea(e.target.value)}
                >
                  <MenuItem key="Full Time" value={"Full Time"}>
                    Full Time
                  </MenuItem>
                  <MenuItem key="Part Time" value={"Part Time"}>
                    Part Time
                  </MenuItem>
                  <MenuItem key="Temporary" value={"Temporary"}>
                    Temporary
                  </MenuItem>
                  <MenuItem key="Intern" value={"Intern"}>
                    Intern
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: "0rem" }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="min_grad_year">
                  Min Graduating Year *
                </InputLabel>
                <Select
                  labelId="min_grad_year"
                  id="min_grad_year_dropdown"
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
                <InputLabel id="max_grad_year">
                  Max Graduating Year *
                </InputLabel>
                <Select
                  labelId="min_grad_year"
                  id="min_grad_year_dropdown"
                  value={maxGradYear}
                  label="Max Graduating Year *"
                  onChange={(e) => setMaxGradYear(e.target.value)}
                >
                  {minGradYear != "" &&
                    temp2.map((value) => {
                      return (
                        <MenuItem
                          key={value + minGradYear}
                          value={value + minGradYear - 1}
                        >
                          {value + minGradYear - 1}
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
                onClick={() => postJob()}
              >
                Post Job
              </Button>
              <Button
                variant="outlined"
                style={{ color: "#1f8f75", borderColor: "#1f8f75" }}
                onClick={() => postJobAndAddAnotherJob()}
              >
                Post and add Another Job
              </Button>
              <Button variant="text" onClick={() => handleCancel()}>
                Cancel
              </Button>
            </Stack>
          </div>
        </Paper>
      </Container>
    </>
  );
}
