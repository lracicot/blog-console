import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import React from "react";

import PropTypes from "prop-types";

import AssetDisplay from "./AssetDisplay";
import Dropzone from "./Dropzone";

const useStyles = makeStyles(() => ({
  modal: {
    verticalAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    overflow: "scroll",
    maxHeight: "100%"
  },
  paper: {
    padding: 15
  }
}));

const SelectAssetModal = props => {
  const classes = useStyles();
  const { assets, renderOpenButton, handleSelection, handleUpload } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {renderOpenButton(() => setOpen(true))}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                className={classes.mainForm}
                key="upload"
              >
                <Dropzone uploadFile={handleUpload} />
              </Grid>
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
                    onClick={() => {
                      setOpen(false);
                      handleSelection(asset);
                    }}
                    asset={asset}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

SelectAssetModal.propTypes = {
  assets: PropTypes.node,
  renderOpenButton: PropTypes.func,
  handleSelection: PropTypes.func,
  handleUpload: PropTypes.func
};

export default SelectAssetModal;
