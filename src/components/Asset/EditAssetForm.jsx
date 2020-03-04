import { reduxForm } from "redux-form/immutable";
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
  const { handleSubmit, isCreating, asset } = props;
  console.log(isCreating);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img src={`https://${asset.public_url}`} alt={asset.title} />
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
