import { Field, reduxForm } from "redux-form/immutable";
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import PostEditor from "../../components/PostEditor";

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

const PostForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="title" component={renderTextField} label="Title" />
      </div>
      <div>
        <Field name="content" component={renderEditor} />
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

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.any,
  reset: PropTypes.func,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: "PostForm" // a unique identifier for this form
  // validate
})(PostForm);
