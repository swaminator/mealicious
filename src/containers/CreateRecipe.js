
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