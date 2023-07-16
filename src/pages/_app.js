import { adminStatus } from '@/context/adminStatus'
import { useState } from 'react'
import '@/styles/globals.css'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import { idOfRoom } from '@/context/idOfRoom'
export default function App({ Component, pageProps }) {
  const [status,setStatus] = useState(0);
  const [roomID,setRoomID] = useState("");
  return(
  <adminStatus.Provider value={{status,setStatus}}>
    <idOfRoom.Provider value={{roomID,setRoomID}}>
    <header>        
      <Nav/>
    </header>
    <Component {...pageProps} />
    <Footer/>
    </idOfRoom.Provider>
  </adminStatus.Provider>
  )
}
