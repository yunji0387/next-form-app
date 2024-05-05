import React from 'react'
import SideNav from '../components/SideNav'

export default function Dashboard() {
  return (
    <main className='flex w-full min-h-screen flex-col items-center justify-center gap-3 p-16 overflow-auto'>
        <h1 className='text-white'>Dashboard</h1>
        <p className='text-white'>Welcome to the dashboard</p>
        <SideNav />
    </main>
  )
}
