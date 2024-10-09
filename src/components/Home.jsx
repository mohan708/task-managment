import React, { useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import { Outlet } from "react-router-dom";
import DeleteModal from './DeleteModal';

const Home = ({ data, deleteItem }) => {
  // hooks

  const [modal, setShowModal] = useState(false);
  const [seleteUser, setSelectedUser] = useState('');

  // modal 
  const showModal = (selectUsers) => {
    setSelectedUser(selectUsers)
    setShowModal(true);
  }
  const closeModal = () => {
    setSelectedUser(' ');
    setShowModal(false)

  }
  const confirmDeleteModal = () => {
    deleteItem(seleteUser)
    closeModal();
  }


  return (
    <>
      <div className='max-w-[1300px] mx-auto'>
        <h1 className='font-bold text-3xl text-center py-4'>User task Managment</h1>
        <Link to={`form`} className='px-4 ml-8 my-4 rounded-md  bg-red-400 py-2' >Add User</Link>
        <table className='w-[100%] my-6 mx-8'>
          <tr className='font-bold text-left'>
            <th>Username </th>
            <th>Name </th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action </th>
          </tr>
          {
            data.map((userData, index) => {
              return (
                <>
                  <tr className='font-bold text-left' key={index}>
                    <td>{userData.username}</td>
                    <td>{userData.name}</td>
                    <td>{userData.email}</td>
                    <td>{userData.phone}</td>
                    <td>{userData.address.street} {" , "} {userData.address.city} </td>
                    <td className=''>
                      <Link to={`/detailed/${userData.id}`} className='bg-red-500 p-2 my-1 rounded mr-2'>view</Link>
                      <Link to={`/form/${userData.id}`} className='bg-red-500 p-2 my-1 rounded mr-2'  >Edit</Link>
                      <button className='bg-green-500 p-2 sm:my-3 lg:my-0 rounded' onClick={() => showModal(userData.id)}>Delete</button>
                    </td>
                  </tr>
                </>
              )
            })
          }
        </table>

        <DeleteModal
          show={modal}
          onClose={closeModal}
          onConfirm={confirmDeleteModal}
        />

      </div>



    </>
  )
}

export default Home
