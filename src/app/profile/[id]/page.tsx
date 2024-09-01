import React from 'react'

function UserProfilePage({params}: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-2'>
      <h1 className='text-white ml-4'>Profile</h1>
      <hr/>
      <p className='text-4xl text-white'>Profile Page
        <span className='p-2 rounded bg-orange-500 text-white ml-2'>{params.id}</span>
      </p>
    </div>
  );
}

export default UserProfilePage;
