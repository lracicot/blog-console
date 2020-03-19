import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

import GlobalFilter from "./GlobalFilter";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  title: {
    flex: "1 1 100%"
  }
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    renderAddButton,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    title
  } = props;
  return (
    <Toolbar>
      <Typography className={classes.title} variant="h4" id="tableTitle">
        {title}
      </Typography>
      {renderAddButton()}
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter || ""}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  renderAddButton: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  globalFilter: PropTypes.string
};

export default TableToolbar;
