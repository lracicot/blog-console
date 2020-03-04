import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#bbbbbb",
  borderStyle: "dashed",
  backgroundColor: "#eeeeee",
  color: "#999999",
  outline: "none",
  transition: "all .24s ease-in-out",
  margin: 10
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#999999",
  backgroundColor: "#cccccc",
  color: "#777777"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const Dropzone = props => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          props.uploadFile(file, reader.result);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [props]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag and drop images here, or click to select files</p>
      </div>
    </section>
  );
};

Dropzone.propTypes = {
  uploadFile: PropTypes.func
};

export default Dropzone;
