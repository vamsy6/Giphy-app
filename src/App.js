import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Loading from './Loading'

function App() {


    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [back, setBack] = useState(false)
    const [headingg, setHeading] = useState(false)

   
  
    useEffect(() => {
      const apiCall = async () => {

        setLoading(true)

       const results = await axios('https://api.giphy.com/v1/gifs/trending',{
          params: {
            api_key: 'UdaOXdnpIPxc2AdtKiyeY0jSAf1fxvhi'
          }
        })
        console.log(results.data)
        setData(results.data.data)
      
        setLoading(false)
        
        
        
      }
      
      apiCall();
    },[])

    const displayGiphs = () => {
      if(loading){
        return <Loading />
      }

     

      return data.map( el => (
        <div key = {el.id} className ='gif'>
          <img src = {el.images.fixed_height.url} alt = 'gif' />
        </div>
      ))
    }

    const searchInput = (e) => {
      setSearch(e.target.value)
    }

    const searchSubmit  = async (e) => {
      
        e.preventDefault()
        const results = await axios('https://api.giphy.com/v1/gifs/search', {
          params: {
            api_key: 'UdaOXdnpIPxc2AdtKiyeY0jSAf1fxvhi',
            q: search,
            limit: 500,
          }
        });
       
      

        setData(results.data.data)
        setBack(true)
        setHeading(true)
    }

    const initial_page = () => {
      displayGiphs()
    }
  
  return (
    <>
    <form className = 'form' >
     { back ? <button  onClick = {initial_page} type = 'submit'> <i className = 'fa fa-home'></i> </button> : null }
      <input onChange = {searchInput} value = {search} type = 'text' placeholder = 'search all giphs' />
      <button onClick = {searchSubmit} type ='submit'><i class="fa fa-search" aria-hidden="true"></i></button>
      
    </form>
    
    <div className ='heading'>
     { headingg ? <p> "Search results" </p> : <p> Trending <i className="fa fa-bolt" aria-hidden="true"></i></p>}
    </div>
    
   <div className = 'gifs' >
     {displayGiphs()}
     </div>

     </>
  );
}


export default App;

