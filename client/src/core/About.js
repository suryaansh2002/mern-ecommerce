import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
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
import Copyright from "../core/Copyright";

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

export default function About() {
  const classes = useStyles();

  return (
    <Layout className="container col-md-8 offset-md-2">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            About Classic Batters
          </Typography>
          <div>
            <img src={logo} style={{ width: "7rem" }} />
          </div>
          <div className="about-txt">
            <p>
              Idli and Dosa are age old healthy breakfast options in every
              household. This organic idli/dosa batter is prepared using 100%
              natural ingredients, ground and fermented using traditional
              methods to prepare fluffy and soft idlis and dosas for your
              family.
            </p>
            <p>
              <ul>
                <li>100% Home made</li>
                <li>Stone Ground</li>
                <li>Naturally Fermented</li>
                <li>No Preservatives</li>
                <li>Packaged Hygienically</li>
                <li>Thick Consistency</li>

              </ul>
            </p>
            <p>
            You can also find us <b><a href="https://g.co/kgs/1aBwSrh" target="_blank" rel="noreferrer">here</a></b>.
            </p>
          </div>
         
        </div>
      </Container>
      <Copyright />
    </Layout>
  );
}
