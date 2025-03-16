import { useState } from "react";
//Outlet for rendering child components based on the current route
import { Outlet } from 'react-router-dom'

//components 
import Header from './components/Header'
import './App.css'

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div>
      <Header account={account} setAccount={setAccount} />
      <Outlet />
    </div>
  )
}

export default App
