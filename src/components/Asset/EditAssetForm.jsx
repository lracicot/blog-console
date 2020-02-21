import { Button, InputAdornment } from "@material-ui/core";
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
  const { handleSubmit, pristine, submitting, isCreating, asset } = props;
  console.log(isCreating);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img src={`https://${asset.public_url}`} />
        <Field
          name="title"
          fullWidth
          component={renderTextField}
          label="Title"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={pristine || submitting || isCreating}
                >
                  Create
                </Button>
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
  pristine: PropTypes.bool,
  asset: PropTypes.any,
  submitting: PropTypes.bool,
  isCreating: PropTypes.bool
};

export default reduxForm({
  form: "AddPostForm"
  // validate
})(AddPostForm);
