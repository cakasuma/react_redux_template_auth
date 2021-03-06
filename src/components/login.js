import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { login } from "actions/user-action";
import { email_regex } from "utility";

const Login = () => {
  const [error_message, setErrorMessage] = React.useState('')
  const dispatch = useDispatch();
  const initial_values = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(login(values)).catch(error => {
      setErrorMessage(error)
      setSubmitting(false);
    });
  };

  return (
    <>
      <div>Login</div>
      <Formik
        initialValues={initial_values}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email Required";
          } else if (!email_regex.test(values.email)) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password Required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder='Email'
            />
            <span>{errors.email && touched.email && errors.email}</span>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder='Password'
            />
            <span>{errors.password && touched.password && errors.password}</span>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
        <span>{error_message}</span>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
