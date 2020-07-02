import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createMeal } from '../graphql/mutations'
import { listMeals } from '../graphql/queries'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"

const initialState = { name: '', description: '', rating: 'GOOD' }

const NewRecipe = () => {
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
      console.log(formState)
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
    <Form>
    <Form.Group controlId="formMealName">
      <Form.Label>Name of recipe</Form.Label>
      <Form.Control type="meal" placeholder="Enter name of dish" />
    </Form.Group>
  
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Recipe notes</Form.Label>
      <Form.Control as="textarea" rows="3" />
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Rating</Form.Label>
    <Form.Control as="select">
      <option>YUCK</option>
      <option>MEH</option>
      <option>GOOD</option>
      <option>AMAZING</option>
    </Form.Control>
  </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
    // <div>
    //   <h1>Meals</h1>
    //   <input
    //     onChange={event => setInput('name', event.target.value)}
    //     value={formState.name}
    //     placeholder="Name"
    //   />
    //   <input
    //     onChange={event => setInput('description', event.target.value)}
    //     value={formState.description}
    //     placeholder="Description"
    //   />
    //   <select
    //     onChange={event => setInput('rating', event.target.value)}
    //     value={formState.rating}>
    //     <option value="YUCK">YUCK</option>
    //     <option value="MEH">MEH</option>
    //     <option value="GOOD">GOOD</option>
    //     <option value="AMAZING">AMAZING</option>
    //   </select>
    //   <button onClick={addMeal}>Add recipe</button>
    // </div>
  )
}
export default NewRecipe