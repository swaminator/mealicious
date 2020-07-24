import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify'
import { listMeals } from '../graphql/queries'
import { Link } from "react-router-dom"


function RecipeList() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    fetchMeals()
  }, [])

  async function fetchMeals() {
    try {
      const mealData = await API.graphql(graphqlOperation(listMeals))
      const meals = mealData.data.listMeals.items
      setMeals(meals)
    } catch (err) { console.log('error fetching meals') }
  }

  return (
    meals.map((meal, index) => (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{meal.name}</Card.Title>
        <Card.Text>
          {meal.description}
    </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    ))
  );
}


export default RecipeList

