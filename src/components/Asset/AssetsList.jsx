import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import moment from "moment";

import PropTypes from "prop-types";

import DeleteButton from "../Button/DeleteButton";
import Dropzone from "./Dropzone";
// import FormModal from "./EditAssetModal";
import SmallSpinner from "../Spinner/SmallSpinner";

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
              <CardHeader
                titleTypographyProps={{ variant: "subtitle1" }}
                subheaderTypographyProps={{ variant: "subtitle2" }}
                title={asset.title}
                subheader={`Uploaded ${moment(asset.created_at).format(
                  "YYYY-MM-DD HH:mm"
                )}`}
              />
              <CardActionArea>
                {asset.public_url ? (
                  <CardMedia
                    className={classes.media}
                    image={`https://${asset.public_url}`}
                    title={asset.title}
                  />
                ) : (
                  <SmallSpinner />
                )}
              </CardActionArea>
              <CardActions>
                <DeleteButton
                  handleDelete={() => handleDelete(asset.uuid)}
                  isLoading={isDeleting[asset.uuid]}
                  disabled={isDeleting[asset.uuid]}
                />
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
  isDeleting: PropTypes.array
};

export default AssetsList;
