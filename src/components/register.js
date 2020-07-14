import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { register } from "actions/user-action";
import { email_regex } from "utility";

const Register = () => {
  const dispatch = useDispatch();
  const initial_values = {
    first_name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(register(values))
  };

  return (
    <>
      <div>Register</div>
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
          if (!values.first_name) {
            errors.first_name = "First name Required";
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
              type="first_name"
              name="first_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
              placeholder='First name'
            />
            <span>{errors.first_name && touched.first_name && errors.first_name}</span>
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
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;
