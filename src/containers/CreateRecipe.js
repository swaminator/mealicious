// import React, { useEffect, useState } from 'react'
// import { createMeal } from '../graphql/mutations'
// import { listMeals } from '../graphql/queries'
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button,InputGroup } from 'react-bootstrap';
// // import { Link } from "react-router-dom"
// // import { Formik } from 'formik';
// import * as yup from 'yup';

// import Amplify, { API, graphqlOperation } from 'aws-amplify'
// import awsExports from "../aws-exports";

// Amplify.configure(awsExports);

// const initialState = { name: '', description: '' }
// const schema = yup.object({
//   name: yup.string().required(),
//   description: yup.string().required()
// });

// const NewRecipe = () => {
//   const [formState, setFormState] = useState(initialState)
//   const [meals, setMeals] = useState([])
  
//   useEffect(() => {
//     fetchMeals()
//   }, [])

//   function setInput(key, value) {
//     setFormState({ ...formState, [key]: value })
//   }

//   async function fetchMeals() {
//     try {
//       const mealData = await API.graphql(graphqlOperation(listMeals))
//       const meals = mealData.data.listMeals.items
//       setMeals(meals)
//     } catch (err) { console.log('error fetching meals') }
//   }
//   async function addMeal() {
//     console.log("addmeal")
//     try {
//       console.log(formState)
//       if (!formState.name || !formState.description) return
//       const meal = { ...formState }
//       setMeals([...meals, meal])
//       setFormState(initialState)
//       await API.graphql(graphqlOperation(createMeal, { input: meal }))
//     } catch (err) {
//       console.log('error creating meal:', err)
//     }
//   }

//   return (
//   //   <Formik
//   //     validationSchema={schema}
//   //     onSubmit={(values, {setSubmitting, resetForm}) => {
        
//   //       alert(JSON.stringify(values, null, 2));
        
//   //       // When button submits form and form is in the process of submitting, submit button is disabled
//   //       setSubmitting(true);
        
//   //       // Resets form after submission is complete
//   //       resetForm();

//   //       // Sets setSubmitting to false after form is reset
//   //       setSubmitting(false);
//   //   }}
//   //     initialValues={{
//   //       name: 'test',
//   //       description: '',
//   //     }}
//   //   >
//   //     {({
//   //       handleSubmit,
//   //       handleChange,
//   //       values,
//   //       touched,
//   //       isSubmitting,
//   //       errors,
//   //     }) => (
//   //       <Form noValidate onSubmit={handleSubmit}>
//   //           <Form.Group controlId="validationFormik01">
//   //             <Form.Label>Name of recipe</Form.Label>
//   //             <Form.Control
//   //               type="meal"
//   //               placeholder="Enter name of dish"
//   //               name="name"
//   //               value={values.name}
//   //               onChange={handleChange}
//   //               isValid={touched.firstName && !errors.firstName}
//   //             />
//   //             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//   //           </Form.Group>
//   //           <Form.Group controlId="validationFormik02">
//   //             <Form.Label>Recipe notes</Form.Label>
//   //             <Form.Control as="textarea" rows="3"
//   //               placeholder="Provide a link to the recipe or any related notes"
//   //               />

//   //             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//   //           </Form.Group>
//   //         <Button type="submit">Submit</Button>
//   //       </Form>
//   //     )}
//   //   </Formik>
//   // );
//     <Form>
//       <Form.Group controlId="formMealName" onSubmit={addMeal}>
//         <Form.Label>Name of recipe</Form.Label>
//         <Form.Control
//           type="meal"
//           placeholder="Enter name of dish"
//           />
//       </Form.Group>

//       <Form.Group controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Recipe notes</Form.Label>
//         <Form.Control as="textarea" rows="3"
//           placeholder="Provide a link to the recipe or any related notes"
//           />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
// )

// }
// export default NewRecipe
 
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createMeal } from '../graphql/mutations'
import { listMeals } from '../graphql/queries'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"

const initialState = { name: '', description: '' }

const CreateRecipe = () => {
  const [formState, setFormState] = useState(initialState)
  const [meals, setMeals] = useState([])

  useEffect(() => {
    fetchMeals()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchMeals() {
    try {
      const mealData = await API.graphql(graphqlOperation(listMeals))
      const meals = mealData.data.listMeals.items
      setMeals(meals)
    } catch (err) { console.log('error fetching meals') }
  }
  async function addMeal() {
    try {
      console.log("test"&& formState)
      if (!formState.name || !formState.description) return
      const meal = { ...formState }
      setMeals([...meals, meal])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createMeal, { input: meal }))
    } catch (err) {
      console.log('error creating meal:', err)
    }
  }

  return (
    <Form onSubmit={addMeal}>
      <Form.Group controlId="formMealName" role="form">
        <Form.Label>Name of recipe</Form.Label>
        <Form.Control
          type="meal"
          onChange={event => setInput('name', event.target.value)}
          value={formState.name}
          placeholder="Enter name of dish"
          />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Recipe notes</Form.Label>
        <Form.Control as="textarea" rows="3"
          placeholder="Provide a link to the recipe or any related notes"
          onChange={event => setInput('description', event.target.value)}
          value={formState.description}
          />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default CreateRecipe