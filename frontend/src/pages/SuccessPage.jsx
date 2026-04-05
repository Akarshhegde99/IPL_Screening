import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CheckCircle, FileText } from 'lucide-react';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearBooking } = useBooking();
  
  const booking = location.state?.booking;

  useEffect(() => {
    // Clear booking context once successfully loaded
    clearBooking();
  }, []);

  if (!booking) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
        <CheckCircle size={80} />
      </div>
      
      <h1 className="text-4xl font-extrabold mb-2">Booking Confirmed!</h1>
      <p className="text-gray-400 mb-10 max-w-md">
        Your tables for the {booking.matchSession.team1} VS {booking.matchSession.team2} match have been successfully reserved.
      </p>

      <div className="glass-card p-8 md:p-10 w-full max-w-sm flex flex-col items-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hcRed to-transparent"></div>
        
        <h3 className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-6">Entry Pass</h3>
        
        <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
          <img src={booking.qrCodeData} alt="Entry QR Code" className="w-48 h-48" />
        </div>

        <div className="w-full space-y-3 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Booking ID</span>
            <span className="font-mono">{booking.id.substring(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Payment Status</span>
            <span className={`font-bold ${booking.paymentStatus === 'PAID' ? 'text-green-500' : 'text-hcGold'}`}>
              {booking.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Link to={`/invoice/${booking.id}`} className="btn-primary flex items-center justify-center">
          <FileText size={18} className="mr-2" />
          View / Print Invoice
        </Link>
        <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
