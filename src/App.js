import { lazy } from 'react';
import './App.css';
import { AuthProvider } from './context/authContext';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import NotifiProvider from './context/notificacionesContext';
const MainLayout = lazy(() => import('./components/MainLayout/MainLayout'));
const Layout = lazy(() => import('./Layout'));


function App() {
  return (
    <AuthProvider>
      <NotifiProvider>
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
      </NotifiProvider>
    </AuthProvider>
  );
}

export default App;