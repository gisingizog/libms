import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import DashboardLayout from './components/layouts/DashboardLayout';
import Overview from './Pages/dashboard/Overview';
import Books from './Pages/dashboard/Books';
import NotFound from './Pages/NotFound';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<DashboardLayout />}>
              <Route path='' element={<Overview />} />
              <Route path='books' element={<Books />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App