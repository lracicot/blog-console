import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(15)
  }
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container justify="center">
        <CircularProgress
          className={classes.progress}
          size={100}
          color="secondary"
          thickness={1.5}
        />
      </Grid>
    </Container>
  );
}
