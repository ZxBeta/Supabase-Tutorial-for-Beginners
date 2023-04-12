import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

const Home = () => {

  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()

      if (error) {
        setFetchError('could not getch data')
        setSmoothies(null)
        console.log(error)
      }

      if(data){
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, [])
  // console.log(supabase)
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (<div className="smoothies">{smoothies.map(smoothie =>(<>
        <h1>{smoothie.title}</h1>
        <p>{smoothie.method}</p>
        <span>{smoothie.rating}</span>
        </>
      ))}</div>)}
    </div>
  )
}

export default Home