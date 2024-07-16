import PropTypes from 'prop-types';
import React, {  useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import apiClient from '../../../utils/apiclient';

import {useNavigate} from'react-router-dom'

const FirebaseLogin = ({ className, ...rest }) => {
  const navigate = useNavigate()

  const [usernamee, setUsernamee] = useState("")
  const [passwordd, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault();
    if (!usernamee || !passwordd) {
      setError('Please fill in all fields');
    } else {
      console.log('');
      try {
        const response = await apiClient.post('/auth/login', {
          username : usernamee,
          password : passwordd
        })
        console.log(response.data.data.accessToken)
        const token = response.data.data.accessToken;
        console.log(token)
        localStorage.setItem('accessToken', token);
        console.log('Login successful, token:', token);
        // Redirect or do something after successful login
        navigate('/')
      } catch (error) {
        console.log('Login failed. Please check your credentials and try again.');
        console.error('Error during login:', error);
      }
    }
    


  }

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
      >
        {({ errors, handleBlur, isSubmitting, touched }) => (
          <form noValidate onSubmit={handleLogin} className={className} {...rest}>
            <div className="form-group mb-3">
              <lavel>Username</lavel>
              <input
                className="form-control"
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={(e) => {
                  const { value, name } = e.target;
                  console.log(value, name)
                  setUsernamee(value)
                  setPassword("a")

                }}
                type="email"
                value={usernamee}
                width={10}
              />
              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={(e)=> {
                  const { value, name } = e.target;
                  console.log(value, name)
                  setPassword(value)

                }}
                type="password"
                value={passwordd}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}
            {/* <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials.
              </label>
            </div> */}

            <Row>
              <Col mt={6}>
                <Button className="btn-block" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                  Signin
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>


      <hr />
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string
};

export default FirebaseLogin;
