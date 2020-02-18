import { Field, reduxForm } from "redux-form/immutable";
import React from "react";
import TextField from "@material-ui/core/TextField";

import PropTypes from "prop-types";

const renderTextField = ({ input, children, ...custom }) => (
  <TextField {...input} {...custom}>
    {children}
  </TextField>
);

renderTextField.propTypes = {
  input: PropTypes.any,
  children: PropTypes.any
};

const AddPostForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="title"
          fullWidth
          component={renderTextField}
          label="Title"
          variant="outlined"
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

AddPostForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.any,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: "AddPostForm"
  // validate
})(AddPostForm);
