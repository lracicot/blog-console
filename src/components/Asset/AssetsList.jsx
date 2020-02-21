import { Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";
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
  const { assets } = props;

  return (
    <div className={classes.root}>
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
            <FormModal asset={asset}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`https://${asset.public_url}`}
                    title={asset.title}
                  />
                </CardActionArea>
              </Card>
            </FormModal>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

AssetsList.propTypes = {
  assets: PropTypes.array
};

export default AssetsList;
