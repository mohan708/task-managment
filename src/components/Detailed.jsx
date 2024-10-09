import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Detailed = ({data}) => {

    const {id} = useParams()// getting id from url
    const userData =  data.find((user)=> user.id == id )
   

  return (
   <>
      <div className='flex flex-col  justify-center text-center my-4 w-[50%] mx-auto   ' >
        <h1 className='font-bold text-3xl py-4 text-green-500'>User detailed </h1>
        <div className=' text-left w-[100%] bg-slate-400 rounded-md px-2'>
            <p className='py-2'> <b>Name:</b> {userData.name}</p>
            <p className='py-2'> <b>Username :</b> {userData.username}</p>
            <p className='py-2'>  <b>Email : </b> {userData.email}</p>
            <p className='py-2'> <b> Number: </b>  {userData.phone}</p>
            <p className='py-2'> <b>Address : </b> {userData.address.street} {userData.address.city}</p>
        </div>
         <Link  to={'/'} className='bg-red-400 w-[30%] py-2 rounded-md my-4 '>Back</Link>
      </div>
      
   </>
  )
}

export default Detailed