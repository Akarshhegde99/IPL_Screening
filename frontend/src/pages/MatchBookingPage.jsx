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
        { id: 1, team1: "LSG", team2: "RCB", matchDate: "2026-04-15", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
        { id: 2, team1: "RCB", team2: "DC", matchDate: "2026-04-18", matchTime: "15:30:00", posterUrl: "/rcb-poster.jpg" },
        { id: 3, team1: "RCB", team2: "GT", matchDate: "2026-04-24", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
        { id: 4, team1: "DC", team2: "RCB", matchDate: "2026-04-27", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
        { id: 5, team1: "GT", team2: "RCB", matchDate: "2026-04-30", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
        { id: 6, team1: "LSG", team2: "RCB", matchDate: "2026-05-07", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" }
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
              <div className="flex-1 flex items-center justify-between">
                <span className="text-gray-300">Number of Tables</span>
                <div className="flex items-center space-x-4 bg-black/40 rounded-lg px-2 py-1">
                  <button 
                    onClick={() => setTables(t => Math.max(1, t - 1))}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl ${tables === 1 ? 'text-gray-600 bg-gray-800 cursor-not-allowed' : 'text-hcRed bg-white/10 hover:bg-white/20 transition-colors'}`}
                    disabled={tables <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-4 text-center">{tables}</span>
                  <button 
                    onClick={() => setTables(t => Math.min(5, t + 1))}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl ${tables === 5 ? 'text-gray-600 bg-gray-800 cursor-not-allowed' : 'text-hcRed bg-white/10 hover:bg-white/20 transition-colors'}`}
                    disabled={tables >= 5}
                  >
                    +
                  </button>
                </div>
              </div>
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
