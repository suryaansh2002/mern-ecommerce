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

export default function Contact() {
  const classes = useStyles();

  return (
    <Layout className="container col-md-8 offset-md-2">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
        
          <div className="about-txt">
            <p>
              In case of any queries or issues please reach out to us at:
              <ul>
                <li>
                  Call/Whatsapp: +91 99789 42082
                </li>
              </ul>
              <p>
                In case of an issue with a particular order, please mention order id in your communication.
              </p>
            </p>
         
          </div>
        </div>
      </Container>
      <Copyright />
    </Layout>
  );
}
