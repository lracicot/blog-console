import { Button, makeStyles } from "@material-ui/core";
import { Field, reduxForm } from "redux-form/immutable";
import React from "react";
import TextField from "@material-ui/core/TextField";

import PropTypes from "prop-types";

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

const renderTextField = ({
  input,
  meta: { touched, error }, // eslint-disable-line
  children,
  // formatter = v => v,
  ...custom
}) => (
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
    handleSubmit,
    handlePublish,
    handleArchive,
    pristine,
    submitting,
    initialValues
  } = props;

  const actionButton =
    initialValues.get("status") !== "published" ? (
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={handlePublish}
        disabled={isPublishing}
      >
        Publish
      </Button>
    ) : (
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={handleArchive}
      >
        Archive
      </Button>
    );

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.buttonGroup}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={pristine || submitting}
        >
          Save
        </Button>
        {actionButton}
      </div>
      <div className={classes.formControl}>
        <Field
          name="title"
          fullWidth
          component={renderTextField}
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
          key={initialValues.get("uuid")}
        />
      </div>
    </form>
  );
};

EditPostForm.propTypes = {
  isPublishing: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handlePublish: PropTypes.func,
  handleArchive: PropTypes.func,
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
