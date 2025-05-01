import React from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthStore } from '../../store/authUser'

const HomePage = () => {
  const { user, isCheckingAuth } = useAuthStore()
 
  if(isCheckingAuth) {
      return (
        <div className="h-screen">
           <div className="flex justify-center items-center bg-black h-full">
             <Loader className="animate-spin text-red-600 size-10" />
           </div>
        </div>
      )
    }

  return (
    <div>
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage