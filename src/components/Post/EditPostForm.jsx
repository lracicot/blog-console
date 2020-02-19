import { Field, reduxForm } from "redux-form/immutable";
import { Typography, makeStyles } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

import PropTypes from "prop-types";

import LoadingButton from "../Button/LoadingButton";
import PostEditor from "../PostEditor";

const useStyles = makeStyles(theme => ({
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

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.buttonGroup}>
        <LoadingButton
          type="submit"
          color="primary"
          isLoading={isSaving}
          disabled={pristine || submitting}
          isDone={pristine}
        >
          {pristine ? "Saved" : "Save"}
        </LoadingButton>
        {actionButton}
        <LoadingButton
          onClick={deleteAction}
          isLoading={isDeleting}
          disabled={isDeleting || initialValues.get("status") === "published"}
        >
          Delete
        </LoadingButton>
      </div>
      <div>
        <Typography className={classes.helperText} variant="body2">
          Last save:{" "}
          {moment(initialValues.get("updated_at")).format("YYYY-MM-DD HH:mm")}
        </Typography>
      </div>
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
