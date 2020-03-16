import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import moment from "moment";

import PropTypes from "prop-types";

import DeleteButton from "../Button/DeleteButton";
import SmallSpinner from "../Spinner/SmallSpinner";

const useStyles = makeStyles(theme => ({
  media: {
    height: 140
  },
  card: {
    margin: theme.spacing(2)
  }
}));

const AssetDisplay = props => {
  const classes = useStyles();
  const { handleDelete, isDeleting, asset, onClick } = props;

  return (
    <Card className={classes.card} onClick={onClick}>
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
      {handleDelete ? (
        <CardActions>
          <DeleteButton
            handleDelete={() => handleDelete(asset.uuid)}
            isLoading={isDeleting}
            disabled={isDeleting}
          />
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
};

AssetDisplay.defaultProps = {
  isDeleting: false,
  handleDelete: false
};

AssetDisplay.propTypes = {
  handleDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onClick: PropTypes.func,
  asset: PropTypes.any,
  isDeleting: PropTypes.bool
};

export default AssetDisplay;
