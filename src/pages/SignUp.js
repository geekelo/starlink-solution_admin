import { Link } from 'react-router-dom';
import '../styles/Login.css';

import AppButton from '../components/AppButton/Button';
import { Lock, LockKeyhole, Mail, Phone, PhoneIncoming, User } from 'lucide-react';
import { FormInput } from '../components/FormInput/Input';
import { FormGroup } from '../components/FormGroups/Form';
import { FormLabel } from '../components/FormLabel/Label';
import { FormRow } from '../components/FormRow/Row';

const SignUp = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted');
    
  };


  return (
    <>
      <div className="auth-container">
        <div className="auth-card signup">
          <div className="auth-header">
            <h1>Sign Up</h1>
            <p>Create your Starlink Admin account</p>
          </div>
  
          <form className="signup-form" onSubmit={handleSubmit}>
           
            <FormRow>
            <FormGroup>
                <FormLabel htmlFor="fname">First Name</FormLabel>
                <FormInput 
                  type="text" 
                  id="fname" 
                  name="fname" 
                  placeholder="First Name" 
                  icon={<User />}
                  required 
                />
              </FormGroup>
  
              <FormGroup>
                <FormLabel htmlFor="mname">Middle Name</FormLabel>
                <FormInput 
                  type="text" 
                  id="mname" 
                  name="mname" 
                  icon={<User />}
                  placeholder="Middle Name" 
                />
              </FormGroup>
  
              <FormGroup>
                <FormLabel htmlFor="lname">Last Name</FormLabel>
                <FormInput 
                  type="text" 
                  id="lname" 
                  icon={<User />}
                  name="lname" 
                  placeholder="Last Name" 
                  required 
                />
              </FormGroup>
            </FormRow>
         
  
            <FormGroup>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput 
                type="email" 
                id="email" 
                name="email" 
                icon={<Mail />}
                placeholder="Email Address" 
                required 
              />
            </FormGroup>
  
            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput 
                type="password" 
                id="password" 
                name="password" 
                icon={<Lock />}
                placeholder="Password" 
                required 
              />
            </FormGroup>
  
            <FormGroup>
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <FormInput 
                type="password" 
                id="confirm_password" 
                name="confirm_password" 
                icon={<LockKeyhole />}
                placeholder="Confirm Password" 
                required 
              />
            </FormGroup>
  
            <FormGroup>
              <FormLabel htmlFor="whatsapp">WhatsApp Number</FormLabel>
              <FormInput 
                type="tel" 
                id="whatsapp" 
                name="whatsapp" 
                icon={<PhoneIncoming  />}
                placeholder="WhatsApp Number" 
                required 
              />
            </FormGroup>
  
            <FormGroup>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <FormInput 
                type="tel" 
                id="phone" 
                name="phone" 
                icon={<Phone />}
                placeholder="Phone Number" 
                required 
              />
            </FormGroup>
  
            <AppButton
              variant="custom"
              backgroundColor="#00adef"
              textColor="#ffffff"
              type="submit"
              className="signup-button"
              fullWidth
            >
              Sign Up
            </AppButton>
  
            <div className="auth-subtitle">
              Already have an account?
              {' '}
              <Link to="/login" className="link">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  // return (
  //   <>
  //     <div className="signup-container">
  //       <div className="signup-content">
  //         <div className="signup-header">
  //           <h1>Sign Up</h1>
  //           <p>Create your Starlink Admin account</p>
  //         </div>

  //         <form className="signup-form" onSubmit={handleSubmit}>
  //           <div className="name-fields">
  //             <div className="form-group">
  //               <input type="text" id="fname" name="fname" placeholder="First Name" required />
  //             </div>

  //             <div className="form-group">
  //               <input type="text" id="mname" name="mname" placeholder="Middle Name" />
  //             </div>

  //             <div className="form-group">
  //               <input type="text" id="lname" name="lname" placeholder="Last Name" required />
  //             </div>
  //           </div>

  //           <div className="form-group">
  //             <input type="email" id="email" name="email" placeholder="Email Address" required />
  //           </div>

  //           <div className="form-group">
  //             <input type="password" id="password" name="password" placeholder="Password" required />
  //           </div>

  //           <div className="form-group">
  //             <input
  //               type="password"
  //               id="confirm_password"
  //               name="confirm_password"
  //               placeholder="Confirm Password"
  //               required
  //             />
  //           </div>

  //           <div className="form-group">
  //             <input type="tel" id="whatsapp" name="whatsapp" placeholder="WhatsApp Number" required />
  //           </div>

  //           <div className="form-group">
  //             <input type="tel" id="phone" name="phone" placeholder="Phone Number" required />
  //           </div>

  //           <button type="submit" className="signup-button">
  //             Sign Up
  //           </button>

  //           <div className="login-link">
  //             Already have an account?
  //             {' '}
  //             <Link to="/login">Login</Link>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default SignUp;


