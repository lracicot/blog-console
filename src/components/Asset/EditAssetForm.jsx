import { Field, reduxForm } from "redux-form/immutable";
import { InputAdornment } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";

import PropTypes from "prop-types";

import DeleteButton from "../Button/DeleteButton";

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
  const { handleSubmit, isCreating, isDeleting, deleteAction, asset } = props;
  console.log(isCreating);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img src={`https://${asset.public_url}`} alt={asset.title} />
        <Field
          name="title"
          fullWidth
          component={renderTextField}
          label="Title"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DeleteButton onClick={deleteAction} isDeleting={isDeleting}>
                  Delete
                </DeleteButton>
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
  isDeleting: PropTypes.bool,
  deleteAction: PropTypes.bool,
  asset: PropTypes.any,
  initialValues: PropTypes.any,
  submitting: PropTypes.bool,
  isCreating: PropTypes.bool
};

export default reduxForm({
  form: "AddPostForm"
  // validate
})(AddPostForm);
