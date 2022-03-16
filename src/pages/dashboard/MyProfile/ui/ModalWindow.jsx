import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const ModalWindow = ({
  open,
  contentText,
  confirmBtnText,
  closeBtnText,
  handleClose,
  onConfirmation,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-describedby="dialog-description"
  >
    <DialogContent>
      <DialogContentText id="dialog-description">
        {contentText}
      </DialogContentText>
    </DialogContent>
    <DialogActions style={{ justifyContent: "center" }}>
      {onConfirmation && (
        <Button
          onClick={onConfirmation}
          color="primary"
          autoFocus
          variant="contained"
        >
          {confirmBtnText}
        </Button>
      )}
      <Button onClick={handleClose} variant="contained">
        {closeBtnText}
      </Button>
    </DialogActions>
  </Dialog>
);

ModalWindow.propTypes = {
  open: PropTypes.bool.isRequired,
  contentText: PropTypes.string.isRequired,
  confirmBtnText: PropTypes.string,
  closeBtnText: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func,
};

export default ModalWindow;
