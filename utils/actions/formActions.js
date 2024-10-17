export const validateInput = (inputId, inputValue, formState) => {
    let isValid = false;
    let errorMessage = '';
  
    switch (inputId) {
      case 'OldPassword':
        if (inputValue.trim().length === 0) {
          errorMessage = 'Old password is required.';
        } else {
          isValid = true;
        }
        break;
  
      case 'NewPassword':
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordPattern.test(inputValue)) {
          errorMessage = 'Password must be at least 8 characters, include letters and numbers.';
        } else {
          isValid = true;
        }
        break;
  
      case 'ConfirmPassword':
        if (inputValue !== formState.inputValues.NewPassword) {
          errorMessage = 'Passwords do not match.';
        } else {
          isValid = true;
        }
        break;
  
      default:
        break;
    }
  
    return { isValid, errorMessage };
  };
  