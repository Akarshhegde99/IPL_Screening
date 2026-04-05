import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { CreditCard, Wallet, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { currentBooking } = useBooking();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cafe'); // 'stripe' or 'cafe'
  const [error, setError] = useState('');

  if (!currentBooking) {
    navigate('/');
    return null;
  }

  const { match, tables, totalPrice } = currentBooking;

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');
    
    try {
      let finalStatus = 'PENDING';

      // If Stripe was selected, simulate the payment process (with fallback to PENDING)
      if (paymentMethod === 'stripe') {
         // Failsafe: Wrap Stripe logic in its own try/catch to NEVER block booking
         try {
            await axios.post(`${API_URL}/payment/create-intent`, { amount: totalPrice });
            // Assume success for demo or set a mock PAID status if real flow finishes
            finalStatus = 'PAID'; 
         } catch (stripeError) {
            console.warn("Stripe failed or not configured. Falling back to PENDING.", stripeError);
            finalStatus = 'PENDING';
         }
      }

      // Create Booking Request
      const requestData = {
        name: user.name,
        phone: user.phone,
        matchId: match.id,
        tables,
        paymentStatus: finalStatus
      };

      const response = await axios.post(`${API_URL}/bookings/create`, requestData);
      
      // Navigate to success
      navigate('/success', { state: { booking: response.data } });

    } catch (err) {
      console.error(err);
      setError('Failed to confirm booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Booking Details</h2>
        
        <div className="glass-card p-6 space-y-4">
          <div className="flex justify-between border-b border-white/10 pb-4">
            <div className="text-gray-400 text-sm">Guest Name</div>
            <div className="font-semibold">{user.name}</div>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-4">
            <div className="text-gray-400 text-sm">Phone</div>
            <div className="font-semibold">{user.phone}</div>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-4">
            <div className="text-gray-400 text-sm">Match</div>
            <div className="font-semibold text-right">{match.team1} vs {match.team2}</div>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-4">
            <div className="text-gray-400 text-sm">Tables Reserved</div>
            <div className="font-semibold">{tables}</div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-gray-300 text-lg">Total Amount</div>
            <div className="text-3xl font-bold text-hcRed">₹{totalPrice}</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Payment Method</h2>
        
        <div className="space-y-4">
          {/* Card Option */}
          <div 
            onClick={() => setPaymentMethod('stripe')}
            className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center shadow-lg ${paymentMethod === 'stripe' ? 'bg-hcRed/10 border-hcRed text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
          >
            <div className={`p-3 rounded-full mr-4 ${paymentMethod === 'stripe' ? 'bg-hcRed text-white' : 'bg-white/10 text-gray-400'}`}>
              <CreditCard size={20} />
            </div>
            <div>
              <div className="font-bold text-lg">Pay Online (Stripe)</div>
              <div className="text-xs opacity-70">Credit/Debit Card, UPI</div>
            </div>
          </div>

          {/* Pay at Cafe Option */}
          <div 
            onClick={() => setPaymentMethod('cafe')}
            className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center shadow-lg ${paymentMethod === 'cafe' ? 'bg-hcRed/10 border-hcRed text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
          >
            <div className={`p-3 rounded-full mr-4 ${paymentMethod === 'cafe' ? 'bg-hcRed text-white' : 'bg-white/10 text-gray-400'}`}>
              <Wallet size={20} />
            </div>
            <div>
              <div className="font-bold text-lg">Pay at Cafe</div>
              <div className="text-xs opacity-70">Confirm now, pay upon arrival</div>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}

        <button 
          onClick={handleConfirmBooking}
          disabled={loading}
          className="btn-primary w-full mt-8 flex justify-center items-center h-14 text-lg"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            `Confirm Booking - ₹${totalPrice}`
          )}
        </button>
      </div>
      
    </div>
  );
}
