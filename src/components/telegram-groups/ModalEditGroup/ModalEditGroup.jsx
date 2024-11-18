import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from '@mui/material/Box';

const ModalEditGroup = ({open, handleClose, onSubmit, defaultValues}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState({
    name: '',
    groupId: '',
    link: ""
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: newValue,
    }));

    if(value) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    let tempErrors = { name: '', groupId: '', link: "" };
    let isValid = true;

    if (!formValues.name) {
      tempErrors.name = 'Group name is required';
      isValid = false;
    }

    if (!formValues.groupId) {
      tempErrors.groupId = 'Group id is required';
      isValid = false;
    } 

    if(!formValues.link) {
      tempErrors.link = 'Link to parser id is required';
      isValid = false;
    } 

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formValues);
      handleClose();
    }
  };

  return (
    <Dialog
    maxWidth="80vw"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add new Telegram group add this field: group name, group id, link for parser and group status (active or inactive).
        </DialogContentText>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '48%' } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Group name"
              type="text"
              fullWidth
              value={formValues.name}
              variant="standard"
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors?.name}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="groupId"
              name="groupId"
              label="Group id"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={formValues.groupId}
              error={Boolean(errors.groupId)}
              helperText={errors?.groupId}
            />
          </div>
          <div>
            <TextField
                autoFocus
                required
                margin="dense"
                id="link"
                name="link"
                label="Parser link"
                type="text"
                fullWidth
                variant="standard"
                value={formValues.link}
                onChange={handleChange}
                error={Boolean(errors.link)}
                helperText={errors?.link}
              />
              <FormControlLabel control={<Switch name="active" onChange={handleChange} checked={formValues.active} />} label="Active" labelPlacement="top" />                
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Edit group</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditGroup;
