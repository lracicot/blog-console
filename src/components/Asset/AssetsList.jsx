import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import PropTypes from "prop-types";

import DeleteButton from "../Button/DeleteButton";
import Dropzone from "./Dropzone";
import FormModal from "./EditAssetModal";

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
            <Card className={classes.card}>
              <CardActionArea>
                <FormModal asset={asset}>
                  <CardMedia
                    className={classes.media}
                    image={`https://${asset.public_url}`}
                    title={asset.title}
                  />
                </FormModal>
              </CardActionArea>
              <CardActions>
                <DeleteButton
                  handleDelete={() => handleDelete(asset.uuid)}
                  isLoading={isDeleting[asset.uuid]}
                  disabled={isDeleting[asset.uuid]}
                >
                  Delete
                </DeleteButton>
              </CardActions>
            </Card>
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
  isDeleting: PropTypes.bool
};

export default AssetsList;
