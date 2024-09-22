import { useEffect } from "react"
import { useState } from "react"
import MealItem from "./MealItem.jsx"

export default function Meals() {
    const [loadedMeals, setLoaedMeals] = useState([])
    async function fetchMeal() {
        const response = await fetch('http://localhost:3000/meals')
        if (!response.ok) {

        }
        const meals = await response.json()
        setLoaedMeals(meals)
    }

    useEffect(() => {
        fetchMeal()
    }, [])


    return <ul id="meals">{loadedMeals.map(meal => <MealItem key={meal.id} meal={meal} />)}</ul>
}