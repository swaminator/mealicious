import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Col, Button, InputGroup } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { Formik } from 'formik';
import * as yup from 'yup';


// const RecipeList = () => {
//   // Pass the useFormik() hook initial form values and a submit function that will
//   // be called when the form is submitted
//   const formik = useFormik({
//     initialValues: {
//       email: 'foo',
//       name: 'test'
//     },
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         onChange={formik.handleChange}
//         value={formik.values.email}
//       />
//       <input
//         id="name"
//         name="name"
//         onChange={formik.handleChange}
//         value={formik.values.name}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default RecipeList


const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

function RecipeList() {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        
        // alert(JSON.stringify(values, null, 2));
        
        // When button submits form and form is in the process of submitting, submit button is disabled
        setSubmitting(true);
        
        // Resets form after submission is complete
        resetForm();

        // Sets setSubmitting to false after form is reset
        setSubmitting(false);
    }}
      initialValues={{
        firstName: 'Mark',
        lastName: 'Otto',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        isSubmitting,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit" disabled={isSubmitting}>Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}


export default RecipeList

