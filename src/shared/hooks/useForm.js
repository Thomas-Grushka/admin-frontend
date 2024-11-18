const useForm = ({defaultValues, validate, }) => {
    const [formValues, setFormValues] = React.useState({
        name: '',
        email: '',
      });
      const [errors, setErrors] = React.useState({
        name: '',
        email: '',
      });
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    
        // Очистка ошибки при вводе
        setErrors({
          ...errors,
          [name]: '',
        });
      };
    
      const validate = () => {
        let tempErrors = { name: '', email: '' };
        let isValid = true;
    
        if (!formValues.name) {
          tempErrors.name = 'Name is required';
          isValid = false;
        }
    
        if (!formValues.email) {
          tempErrors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
          tempErrors.email = 'Email is not valid';
          isValid = false;
        }
    
        setErrors(tempErrors);
        return isValid;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          console.log('Form submitted:', formValues);
          handleClose();
        }
      };
}

export default useForm;