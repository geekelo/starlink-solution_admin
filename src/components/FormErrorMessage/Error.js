import  '../../styles/error.css'

const FormErrorMessage = ({ message }) => {
    if (!message) return null;
  
    return <p className=".error">{message}</p>;
  };
  
  export default FormErrorMessage;
  