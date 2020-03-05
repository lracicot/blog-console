import { Field, reduxForm } from "redux-form/immutable";
import { InputAdornment } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";

import PropTypes from "prop-types";

import LoadingButton from "../Button/LoadingButton";

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
  const { handleSubmit, pristine, submitting, isCreating } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="title"
          fullWidth
          component={renderTextField}
          label="Title"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  isLoading={isCreating}
                  disabled={pristine || submitting || isCreating}
                >
                  Create
                </LoadingButton>
              </InputAdornment>
            )
          }}
        />
      </div>
    </form>
  );
};

AddPostForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.any,
  submitting: PropTypes.bool,
  isCreating: PropTypes.bool
};

export default reduxForm({
  form: "AddPostForm"
  // validate
})(AddPostForm);
