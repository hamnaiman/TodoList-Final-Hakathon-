import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert('Signup successful!');
      navigate('/signin'); // After signup, move to Signin
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form onSubmit={handleSubmit} className="bg-green-100 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600">
          Sign Up
        </button>

        <p className="mt-4 text-center text-green-600">
          Already have an account?{' '}
          <span
            className="cursor-pointer font-bold text-green-700 hover:underline"
            onClick={() => navigate('/signin')}
          >
            Sign In here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
