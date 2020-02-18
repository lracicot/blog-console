import { Field, reduxForm } from "redux-form/immutable";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import PropTypes from "prop-types";

import PostEditor from "../PostEditor";

const useStyles = makeStyles(() => ({
  formControl: {
    marginTop: "10px"
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
  const { handleSubmit, pristine, reset, submitting, initialValues } = props;
  console.log(initialValues.toJS());
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.formControl}>
        <Field
          name="title"
          fullWidth
          component={renderTextField}
          label="Title"
          // className={classes.titleInput}
        />
      </div>
      <div className={classes.formControl}>
        <Field
          name="slug"
          component={renderTextField}
          label="Url"
          variant="outlined"
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
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

EditPostForm.propTypes = {
  handleSubmit: PropTypes.func,
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
