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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              dictum non ipsum in tempor. Nunc pulvinar neque nec diam faucibus,
              id lobortis erat eleifend. Nulla ac enim ac turpis elementum
              tempor. Fusce hendrerit facilisis tincidunt. Vestibulum congue
              quam dolor, in viverra eros semper non. Maecenas dignissim neque
              hendrerit cursus vulputate. Mauris mollis felis augue, et luctus
              arcu interdum eget. Sed imperdiet eros turpis. Duis est ante,
              ultrices sed pharetra nec, fringilla quis neque.
            </p>
            <p>
              Maecenas scelerisque velit id nulla consequat dignissim. Aliquam
              euismod porta lorem in sollicitudin. Integer malesuada scelerisque
              dolor, eu venenatis arcu volutpat id. Nulla et porttitor elit. In
              non interdum nibh. Proin dictum diam orci, vel egestas arcu
              euismod in. Etiam porta dignissim venenatis. Donec suscipit lectus
              nec sapien convallis eleifend et non erat. Duis et interdum
              sapien. Nunc in neque pharetra, laoreet leo sed, pharetra est.
              Donec sit amet ex enim.
            </p>{" "}
          </div>
        </div>
      </Container>
      <Copyright />
    </Layout>
  );
}
