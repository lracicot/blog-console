import { Image } from "@material-ui/icons";
import { useEditor } from "slate-react";
import React from "react";

import PropTypes from "prop-types";

import { insertImage } from "../../slate-image/with-image";
import AssetSelectionModal from "../../../../containers/Asset/AssetSelectionModal";
import ToolbarButton from "./ToolbarButton";

const InsertImageButton = ({ handleUpload }) => {
  const editor = useEditor();
  return (
    <AssetSelectionModal
      handleSelection={asset =>
        insertImage(editor, `https://${asset.public_url}`)
      }
      handleUpload={handleUpload}
      renderOpenButton={handleOpen => (
        <ToolbarButton onClick={handleOpen}>
          <Image />
        </ToolbarButton>
      )}
    />
  );
};

InsertImageButton.propTypes = {
  handleUpload: PropTypes.func.isRequired
};

export default InsertImageButton;
