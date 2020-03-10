import { Box, Button, Card, CardMedia, makeStyles } from "@material-ui/core";
import { Cancel, Collections } from "@material-ui/icons";
import { fromJS } from "immutable";
import React from "react";

import PropTypes from "prop-types";

import { useHover } from "../../hook";
import AssetSelectionModal from "../../containers/Asset/AssetSelectionModal";

const useStyles = makeStyles(() => ({
  media: {
    height: 140
  },
  card: {
    position: "relative",
    marginTop: 10
  },
  overlay: {
    position: "absolute",
    top: "5px",
    left: "5px",
    color: "white",
    cursor: "pointer"
  }
}));

const ImageInput = ({ value, onChange, handleUpload }) => {
  const classes = useStyles();
  const [hoverRef, isHovered] = useHover();

  return (
    <div>
      <AssetSelectionModal
        handleSelection={asset => onChange(fromJS(asset))}
        handleUpload={handleUpload}
        renderOpenButton={handleOpen => (
          <Button variant="contained" onClick={handleOpen}>
            <Collections /> Select image
          </Button>
        )}
      />
      {value ? (
        <Card className={classes.card} ref={hoverRef}>
          <CardMedia
            className={classes.media}
            image={`https://${value.get("public_url")}`}
          />
          <Box
            onClick={() => onChange(false)}
            display={isHovered ? "inherit" : "none"}
            className={classes.overlay}
          >
            <Cancel />
          </Box>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

ImageInput.defaultProps = {
  deleteFile: null
};

ImageInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  handleUpload: PropTypes.func
};

export default ImageInput;
