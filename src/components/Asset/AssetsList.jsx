import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import PropTypes from "prop-types";

import AssetDisplay from "./AssetDisplay";
import Dropzone from "./Dropzone";

const useStyles = makeStyles(theme => ({
  media: {
    height: 140
  },
  card: {
    margin: theme.spacing(2)
  }
}));

const AssetsList = props => {
  const classes = useStyles();
  const { assets, handleDelete, handleUpload, isDeleting } = props;

  return (
    <div className={classes.root}>
      <Dropzone uploadFile={handleUpload} />
      <Grid container spacing={3}>
        {assets.map(asset => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={classes.mainForm}
            key={asset.uuid}
          >
            <AssetDisplay
              asset={asset}
              handleDelete={handleDelete}
              isDeleting={isDeleting[asset.uuid]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

AssetsList.defaultProps = {
  isDeleting: false
};

AssetsList.propTypes = {
  assets: PropTypes.array,
  handleDelete: PropTypes.func,
  handleUpload: PropTypes.func,
  isDeleting: PropTypes.array
};

export default AssetsList;
