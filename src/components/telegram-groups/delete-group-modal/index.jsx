import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddGroupModal = ({ open, handleClose, groupName, onAgree }) => {

  return (
    <Dialog maxWidth="80vw" open={open} onClose={handleClose}>
      <DialogTitle>Delete group {groupName}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {Boolean(groupName) ? `if you delete group "${groupName}" you can't restore it.` : `no groups selected`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={() => {
          if(Boolean(groupName)) {
            onAgree();
          }
          handleClose();
        }}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroupModal;
