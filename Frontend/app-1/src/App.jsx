import './App.css'
import { Outlet } from 'react-router-dom'


function App() {



  return (
    <div className='flex flex-wrap justify-center'>
      <div className='w-full flex flex-col min-h-screen text-center'>
        <header>
          {/* <Header /> */}
        </header>
        <main className='flex-1'>
          <Outlet />
        </main>
        <footer>
          {/* <Footer /> */}
        </footer>
      </div>
    </div>
  )
}

export default App
