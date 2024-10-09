import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Form = ({ data = [], addData, updateData }) => {
  const { id } = useParams()
  const existUser = id ? data.find((datas) => datas.id === parseInt(id)) : null;

  // navigation
 const navigate = useNavigate();

  //  hooks
  const [username, setUsername] = useState(existUser ? existUser.username : "")
  const [name, setName] = useState(existUser ? existUser.name : '')
  const [email, setEmail] = useState(existUser ? existUser.email : '')
  const [phone, setNumber] = useState(existUser ? existUser.phone : '')
  const [street, setStreet] = useState(existUser && existUser.address ? existUser.address.street : '')
  const [city, setCity] = useState(existUser && existUser.address ? existUser.address.city : '')

  
  useEffect(() => {
    if (existUser) {
      setUsername(existUser.username);
      setName(existUser.name);
      setEmail(existUser.email);
      setNumber(existUser.phone);

      // Update address fields
      if (existUser.address) {
        setStreet(existUser.address.street || '');
        setCity(existUser.address.city || '');

      }
    }
  }, [existUser]);


  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = { username, name, email, phone, address: { street, city } };
    // for updation 
    if (existUser) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData)
        .then((response) => {
          updateData({ ...response.data, id: existUser.id });
          navigate('/')
        }).catch((e) => {
          console.log(e)
        })
    }
    // adding new data in list
    else {
      axios.post('https://jsonplaceholder.typicode.com/users', userData)
        .then((response) => {
          const newUser = { ...response.data, id: data.length + 1 }
          addData(newUser)
          navigate('/')
        }).catch((e) => {
          console.log(e);
        })
    }
  }
  return (
    <>
      <div className='w-[100%] bg-green-300 flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center  w-[60%] sm:w-[60%] md:w-[50%] py-6 rounded-lg  lg:w-[30%] mx-auto bg-white'>
          <h1 className='text-3xl pb-4 text-center font-bold '> {id ? "Edit user " : "Add user"}  </h1>
          <form className=' ' onSubmit={handleSubmit} >
            <div className='py-2'>
              <p className='pb-1'>Username </p>
              <input
                type="text"
                minLength={4}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!!existUser}
                className='border-2  px-2  py-1   rounded-md border-slate-500' />
            </div>
            <div className='py-2'>
              <p className='pb-1'>name </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required className='border-2   px-2 py-1 rounded-md border-slate-500' />
            </div>
            <div className='py-2'>
              <p className='pb-1'>Email </p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-2  py-1 px-2 rounded-md border-slate-500' />
            </div>
            <div className='py-2'>
              <p className='pb-1'>Number</p>
              <input type="text"
                required
                value={phone}
                onChange={(e) => setNumber(e.target.value)}
                className='border-2  py-1 px-2 rounded-md border-slate-500' />
            </div>
            <div className='py-2'>
              <p className='pb-1'>Street</p>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className='border-2  py-1 px-2 rounded-md border-slate-500' />
            </div>
            <div className='py-2'>
              <p className='pb-1'>City </p>
              <input type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='border-2  py-1 px-2 rounded-md border-slate-500' />
            </div>
            <button className='bg-pink-600 text-white ml-12 p-2 mt-4 rounded-md'>Submitted</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
