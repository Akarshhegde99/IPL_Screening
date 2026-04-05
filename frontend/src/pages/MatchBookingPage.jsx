import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { useBooking } from '../context/BookingContext';
import { Users, AlertCircle } from 'lucide-react';

export default function MatchBookingPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { setBookingData } = useBooking();
  
  const [match, setMatch] = useState(null);
  const [tables, setTables] = useState(1);
  const [loading, setLoading] = useState(true);

  const PRICE_PER_TABLE = 499;

  useEffect(() => {
    const fetchMatch = async () => {
      // Fallback Data
      const fallbackMatches = [
        { id: 1, team1: "CSK", team2: "RCB", matchDate: "2026-04-05", matchTime: "19:30:00", posterUrl: "/poster.jpg" },
        { id: 2, team1: "Coming Soon", team2: "TBD", matchDate: "2026-04-10", matchTime: "19:30:00", posterUrl: "/coming-soon.jpg" },
        { id: 3, team1: "Coming Soon", team2: "TBD", matchDate: "2026-04-14", matchTime: "19:30:00", posterUrl: "/coming-soon.jpg" }
      ];

      try {
        const response = await axios.get(`${API_URL}/matches`);
        let found = response.data.find(m => m.id.toString() === matchId);
        
        if (!found) {
            found = fallbackMatches.find(m => m.id.toString() === matchId);
        }
        
        if (found) setMatch(found);
      } catch (error) {
        console.warn("Backend unavailable, using fallback data for booking page.", error);
        const found = fallbackMatches.find(m => m.id.toString() === matchId);
        if (found) setMatch(found);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
  }, [matchId]);

  const handleProceed = () => {
    setBookingData({
      match,
      tables,
      totalPrice: tables * PRICE_PER_TABLE
    });
    navigate('/checkout');
  };

  if (loading) return <div className="text-center py-20">Loading match details...</div>;
  if (!match) return <div className="text-center py-20 text-red-500">Match not found</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="glass-card overflow-hidden">
        <div className="h-40 bg-black/50 relative">
           <img 
              src={match.posterUrl !== '/poster.jpg' && match.posterUrl !== '/coming-soon.jpg' ? match.posterUrl : (match.posterUrl === '/poster.jpg' ? '/poster.jpg' : `https://fakeimg.pl/600x400/990000/fff/?text=${match.team1}+vs+${match.team2}`)}
              alt="Match Poster" 
              onError={(e) => { e.currentTarget.src = `https://fakeimg.pl/600x400/990000/fff/?text=${match.team1}+vs+${match.team2}`; }}
              className="object-cover w-full h-full opacity-50 blur-md"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col z-10 drop-shadow-md">
              <h2 className="text-3xl font-bold">{match.team1 === 'Coming Soon' ? 'Coming Soon' : `${match.team1} VS ${match.team2}`}</h2>
              <p className="text-hcGold mt-2 font-bold tracking-wider">
                {new Date(match.matchDate).toLocaleDateString('en-IN')} at {match.matchTime.substring(0, 5)}
              </p>
            </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="bg-hcRed/10 border border-hcRed/20 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="text-hcRed shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              Each table combo costs ₹{PRICE_PER_TABLE} and includes reserved seating and a complimentary beverage mocktail. Maximum 5 tables per booking.
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-medium">Select Tables Options</label>
            <div className="flex items-center space-x-6 bg-white/5 p-4 rounded-lg border border-white/10">
              <Users className="text-gray-400" />
              <div className="flex-1">
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={tables} 
                  onChange={(e) => setTables(parseInt(e.target.value))}
                  className="w-full accent-hcRed"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 Table</span>
                  <span>5 Tables</span>
                </div>
              </div>
              <div className="text-2xl font-bold w-12 text-center text-white">{tables}</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between text-lg mb-2 text-gray-300">
              <span>Price per table</span>
              <span>₹{PRICE_PER_TABLE}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold mt-4">
              <span>Total Amount</span>
              <span className="text-hcRed">₹{tables * PRICE_PER_TABLE}</span>
            </div>
          </div>

          <button onClick={handleProceed} className="btn-primary w-full mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
