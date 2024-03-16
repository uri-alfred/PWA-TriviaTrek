import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/authContext';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import MainLayout from './components/MainLayout/MainLayout';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import  Layout  from './Layout';


function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>} >
            <Route path="/" element={<Home />} exact />
            <Route path="/playQuiz" element={<Quiz />} />
          </Route>
          <Route path="/inicioSession" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;