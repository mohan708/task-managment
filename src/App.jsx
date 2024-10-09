import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import { createBrowserRouter } from 'react-router-dom'
import Root from './components/Root'
import Form from './components/Form'
import { RouterProvider } from "react-router-dom";
import axios from 'axios'
import Detailed from './components/Detailed'

function App() {

  const [data, setData] = useState([])

  // api fetch 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(userData => {
        // console.log('User Data', userData);
        setData(userData)
      })
      .catch(error => {
        console.log('Error: , error')
      })
  }, [])

  // add new user in the list 
  const addData = (newUser) => {
    setData([...data, newUser])

  }
  //  updation in existing data
  const updateData = (updateData) => {
    const updateDatas = data.map((user) => user.id === updateData.id ? updateData : user)
    setData(updateDatas)
  }

  // delete item from list
  const deleteItem = (id) => {

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setData(data.filter((e) => e.id !== id))
      })
      .catch((e) => {
        console.log('failed to load error')
      })

  }


  // routing
   const router = createBrowserRouter([
    {
      path: '/',
      element: <Home data={data} deleteItem={deleteItem} />,
    },
    {
      path: `form`,
      element: <Form addData={addData} data={data} />
    },
    {
      path: `detailed/:id`,
      element: < Detailed data={data} />
    },
    {
      path: `form/:id`,
      element: <Form data={data} updateData={updateData} />
    }

  ])

  return <RouterProvider router={router} />

}

export default App
