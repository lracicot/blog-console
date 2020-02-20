import {
  Divider,
  Grid,
  Paper,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Field, reduxForm } from "redux-form/immutable";
import React from "react";
import TagsInput from "react-tagsinput";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { fromJS } from "immutable";
// import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.
import "./tagsinput.css"; // If using WebPack and style-loader.

import PropTypes from "prop-types";

import LoadingButton from "../Button/LoadingButton";
import PostEditor from "../PostEditor";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  formControl: {
    marginTop: "20px"
  },
  resize: {
    fontSize: 35
  },
  smallInput: {
    fontSize: 12,
    color: "#888888"
  },
  helperText: {
    fontSize: 12,
    color: "#888888"
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1)
    },
    marginBottom: 10
  },
  rightMenuDivider: {
    marginTop: 10,
    marginBottom: 10
  },
  mainForm: {
    order: 2,
    [theme.breakpoints.up("md")]: {
      order: 1
    }
  },
  sideBar: {
    order: 1,
    [theme.breakpoints.up("md")]: {
      order: 2
    }
  }
}));

// const validate = values => {
//   const errors = {};
//   const requiredFields = ["title"];
//   requiredFields.forEach(field => {
//     if (!values[field]) {
//       errors[field] = "Required";
//     }
//   });
//   return errors;
// };

const renderTextField = ({ input, children, ...custom }) => (
  <TextField {...input} {...custom}>
    {children}
  </TextField>
);

renderTextField.propTypes = {
  input: PropTypes.any,
  children: PropTypes.any
};

const renderTagsField = ({ input, placeholder, ...custom }) => {
  return (
    <TagsInput
      onChange={values => {
        input.onChange(fromJS(values));
      }}
      onlyUnique
      tagProps={{ className: "react-tagsinput-tag info" }}
      inputProps={{ placeholder: placeholder }}
      value={typeof input.value === "object" ? input.value.toJS() : []}
      {...custom}
    />
  );
};

renderTagsField.propTypes = {
  input: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string
};

const renderEditor = ({ input, ...custom }) => {
  return <PostEditor {...input} {...custom} />;
};

renderEditor.propTypes = {
  input: PropTypes.any
};

const EditPostForm = props => {
  const classes = useStyles();
  const {
    isPublishing,
    isArchiving,
    isDeleting,
    isSaving,
    handleSubmit,
    handlePublish,
    handleArchive,
    handleDelete,
    pristine,
    submitting,
    initialValues
  } = props;

  const actionButton =
    initialValues.get("status") !== "published" ? (
      <LoadingButton
        type="button"
        variant="contained"
        color="secondary"
        onClick={handlePublish}
        isLoading={isPublishing}
        disabled={isPublishing || !pristine}
      >
        Publish
      </LoadingButton>
    ) : (
      <LoadingButton
        type="button"
        variant="contained"
        color="secondary"
        onClick={handleArchive}
        isLoading={isArchiving}
        disabled={isArchiving || !pristine}
      >
        Archive
      </LoadingButton>
    );

  const deleteAction = () => {
    if (window.confirm("Are you sure?")) {
      handleDelete();
    }
  };

  const formDisabled = isPublishing || isArchiving || isSaving || isDeleting;

  // console.log(initialValues.get("tags"));

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={7} className={classes.mainForm}>
          <Paper className={classes.paper}>
            <div className={classes.formControl}>
              <Field
                name="title"
                fullWidth
                component={renderTextField}
                disabled={formDisabled}
                label="Title"
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
              />
            </div>
            <div className={classes.formControl}>
              <Field
                name="slug"
                component={renderTextField}
                disabled={formDisabled}
                label="Url"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.smallInput
                  }
                }}
                fullWidth
                size="small"
              />
            </div>
            <div className={classes.formControl}>
              <Field
                name="content"
                component={renderEditor}
                disabled={formDisabled}
                key={initialValues.get("uuid")}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={2} className={classes.sideBar}>
          <Paper className={classes.paper}>
            <LoadingButton
              type="submit"
              color="primary"
              fullWidth
              isLoading={isSaving}
              disabled={pristine || submitting}
              isDone={pristine}
            >
              {pristine ? "Saved" : "Save"}
            </LoadingButton>
            <div>
              <Typography className={classes.helperText} variant="body2">
                Last save:{" "}
                {moment(initialValues.get("updated_at")).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </Typography>
            </div>
            <Divider className={classes.rightMenuDivider} />
            Status:{" "}
            {initialValues
              .get("status")
              .charAt(0)
              .toUpperCase() + initialValues.get("status").slice(1)}
            <Divider className={classes.rightMenuDivider} />
            <div className={classes.buttonGroup}>
              {actionButton}
              <LoadingButton
                onClick={deleteAction}
                isLoading={isDeleting}
                disabled={
                  isDeleting || initialValues.get("status") === "published"
                }
              >
                Delete
              </LoadingButton>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <Typography component="h5" variant="h5">
              Tags
            </Typography>
            <div className={classes.formControl}>
              <Field
                name="tags"
                label="tags"
                variant="outlined"
                suggestions={["patate"]}
                component={renderTagsField}
                disabled={formDisabled}
                fullWidth
                key={initialValues.get("uuid")}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

EditPostForm.propTypes = {
  isPublishing: PropTypes.bool,
  isArchiving: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isSaving: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handlePublish: PropTypes.func,
  handleArchive: PropTypes.func,
  handleDelete: PropTypes.func,
  pristine: PropTypes.any,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  initialValues: PropTypes.any
};

export default reduxForm({
  form: "EditPostForm",
  enableReinitialize: true
  // validate
})(EditPostForm);
