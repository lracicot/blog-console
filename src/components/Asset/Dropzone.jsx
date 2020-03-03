import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import React, { useCallback } from "react";

const Dropzone = props => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          props.uploadFile(file.path, reader.result, file.type);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [props]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    </section>
  );
};

Dropzone.propTypes = {
  uploadFile: PropTypes.func
};

export default Dropzone;
