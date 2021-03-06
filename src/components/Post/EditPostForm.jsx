import "./tagsinput.css";

import {
  Divider,
  Grid,
  Paper,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Field, reduxForm } from "redux-form/immutable";
import { fromJS } from "immutable";
import React from "react";
import TagsInput from "react-tagsinput";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

import { Prompt } from "react-router";
import PropTypes from "prop-types";

import DeleteButton from "../Button/DeleteButton";
import ImageInput from "../Form/ImageInput";
import LoadingButton from "../Button/LoadingButton";
import PostEditor from "../PostEditor/slate";

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
  },
  headerImage: {
    width: "100%"
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

const renderEditor = ({ input, ...custom }) => (
  <PostEditor {...input} {...custom} />
);

renderEditor.propTypes = {
  input: PropTypes.any
};

const renderImageInput = ({ input, ...custom }) => (
  <ImageInput {...input} {...custom} />
);

renderImageInput.propTypes = {
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
    initialValues,
    handleUpload,
    websiteUrl
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

  if (!pristine) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = undefined;
  }

  const formDisabled = isPublishing || isArchiving || isSaving || isDeleting;

  return (
    <form onSubmit={handleSubmit}>
      <Prompt
        when={!pristine}
        message="You have unsaved changes. Do you want to leave?"
      />
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
                name="content"
                component={renderEditor}
                handleSave={handleSubmit}
                handleImageUpload={handleUpload}
                disabled={formDisabled}
                key={initialValues.get("uuid")}
              />
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <Typography component="h5" variant="h5">
              Abstract
            </Typography>
            <div className={classes.formControl}>
              <Field
                name="abstract"
                component={renderTextField}
                disabled={formDisabled}
                label="Abstract"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.smallInput
                  }
                }}
                fullWidth
                multiline
                rows={4}
                rowsMax={10}
              />
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <Typography component="h5" variant="h5">
              SEO
            </Typography>
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
                name="description"
                component={renderTextField}
                disabled={formDisabled}
                label="Meta description"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.smallInput
                  }
                }}
                fullWidth
                multiline
                rows={2}
                maxLength={158}
                rowsMax={4}
              />
            </div>
            <div className={classes.formControl}>
              <label>Meta tags</label>
              <Field
                name="tags"
                label="Tags"
                variant="outlined"
                component={renderTagsField}
                disabled={formDisabled}
                fullWidth
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
            <p>
              Status:{" "}
              {initialValues
                .get("status")
                .charAt(0)
                .toUpperCase() + initialValues.get("status").slice(1)}
            </p>
            {initialValues.get("status") === "published" ? (
              <p>
                <a
                  href={`${websiteUrl(initialValues.get("slug"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View post
                </a>
              </p>
            ) : (
              ""
            )}
            <Divider className={classes.rightMenuDivider} />
            <div className={classes.buttonGroup}>{actionButton}</div>
          </Paper>
          <Paper className={classes.paper}>
            <Typography component="h5" variant="h5">
              Header
            </Typography>
            <div className={classes.formControl}>
              <Field
                name="header_image"
                handleUpload={handleUpload}
                component={renderImageInput}
                disabled={formDisabled}
                fullWidth
                key={initialValues.get("uuid")}
              />
            </div>
          </Paper>
          <DeleteButton
            handleDelete={handleDelete}
            isLoading={isDeleting}
            disabled={isDeleting || initialValues.get("status") === "published"}
          >
            Delete article
          </DeleteButton>
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
  handleUpload: PropTypes.func,
  pristine: PropTypes.any,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  initialValues: PropTypes.any,
  websiteUrl: PropTypes.func
};

export default reduxForm({
  form: "EditPostForm",
  enableReinitialize: true
  // validate
})(EditPostForm);
