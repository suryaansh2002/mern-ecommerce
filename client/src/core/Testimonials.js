import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "./Layout";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../images/logo.png";
import Copyright from "./Copyright";
import { testimonialsData } from "./TestimonialsData";
import TestimonialsCard from "./testimonialsCard";

import image1 from '../images/testimonials/1.png'
import image2 from '../images/testimonials/2.png'
import image3 from '../images/testimonials/3.png'
import image4 from '../images/testimonials/4.png'
import image5 from '../images/testimonials/5.png'
import image6 from '../images/testimonials/6.png'
import image7 from '../images/testimonials/7.png'
import image8 from '../images/testimonials/8.png'

const testimonialImages = [image1,image2,image3,image4,image5,image5,image6,image7]
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Testimonials() {
  const classes = useStyles();

  return (
    <Layout className="container col-md-8 offset-md-2">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Our Testimonials
          </Typography>
          <div class="testimonials-container">
         {testimonialImages.map((item)=>(<TestimonialsCard image={item}/>))}
          </div>
        </div>
      </Container>
      <Copyright />
    </Layout>
  );
}
