import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ApplicationProvider } from './context/ApplicationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';
import Analytics from './pages/Analytics';

function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<AddApplication />} />
              <Route path="/applications/:id" element={<EditApplication />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" theme="dark" autoClose={2000} />
      </BrowserRouter>
    </ApplicationProvider>
  );
}

export default App;
