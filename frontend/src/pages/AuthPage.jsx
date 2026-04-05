import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Phone } from 'lucide-react';

export default function AuthPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinue = (e) => {
    e.preventDefault();
    if (name.trim() === '' || phone.trim() === '') {
      setError('Please fill in both fields');
      return;
    }
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    login(name, phone);
    
    // Redirect back to where they came from (e.g., booking a specific match)
    // Or home if direct visit
    const from = location.state?.from?.pathname || '/';
    navigate(from);
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="glass-card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-2 text-center text-white">Join the Screening</h2>
        <p className="text-gray-400 text-center mb-8">Enter your details to proceed</p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleContinue} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Virat Kohli"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                className="input-field pl-10"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength="10"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-4">
            Continue to Book
          </button>
        </form>
      </div>
    </div>
  );
}
