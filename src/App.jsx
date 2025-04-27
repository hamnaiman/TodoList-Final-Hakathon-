import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
// Import your Dashboard component (assuming you have it)
import Dashboard from './components/Dashboard'; 

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <div className="bg-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">To-Do App</h1>
          <div className="space-x-4">
            <Link to="/" className="text-green-600 hover:underline">Sign Up</Link>
            <Link to="/signin" className="text-green-600 hover:underline">Sign In</Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
