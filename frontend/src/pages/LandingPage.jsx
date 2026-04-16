import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { ChevronRight, Calendar, Clock } from 'lucide-react';

export default function LandingPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${API_URL}/matches`);
        if (response.data && response.data.length > 0) {
            setMatches(response.data);
        } else {
            throw new Error("Empty matches array");
        }
      } catch (error) {
        console.warn("Using fallback local match data because backend is unreachable or empty.");
        // Fallback Data based on the user's uploaded poster exactly
        setMatches([
            { id: 1, team1: "LSG", team2: "RCB", matchDate: "2026-04-15", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
            { id: 2, team1: "RCB", team2: "DC", matchDate: "2026-04-18", matchTime: "15:30:00", posterUrl: "/rcb-poster.jpg" },
            { id: 3, team1: "RCB", team2: "GT", matchDate: "2026-04-24", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
            { id: 4, team1: "DC", team2: "RCB", matchDate: "2026-04-27", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
            { id: 5, team1: "GT", team2: "RCB", matchDate: "2026-04-30", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" },
            { id: 6, team1: "LSG", team2: "RCB", matchDate: "2026-05-07", matchTime: "19:30:00", posterUrl: "/rcb-poster.jpg" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col space-y-10 py-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Experience IPL Like <span className="text-hcRed">Never Before</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Join us at Harvey's Cafe for exclusive live screenings of the biggest IPL matches. 
          Book your tables now!
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <div className="w-2 h-8 bg-hcRed mr-3 rounded-full"></div>
          Upcoming Screenings
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hcRed"></div>
          </div>
        ) : (
          <div className="flex overflow-x-auto space-x-6 pb-8 pt-4 hide-scrollbar px-2">
            {matches.map((match) => {
              const isPastMatch = new Date(`${match.matchDate}T${match.matchTime || '00:00:00'}`) < new Date();
              return (
              <div 
                key={match.id} 
                className="glass-card min-w-[320px] md:min-w-[400px] flex-shrink-0 group overflow-hidden transition-all duration-300 hover:border-white/30"
              >
                <div 
                  className={`h-48 md:h-56 w-full relative overflow-hidden bg-black/50 ${match.team1 !== 'Coming Soon' && !isPastMatch ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                        if(match.team1 !== 'Coming Soon' && !isPastMatch) navigate(`/book/${match.id}`);
                  }}
                >
                  <img 
                    src={match.posterUrl || '/rcb-poster.jpg'}
                    alt="Match Poster" 
                    onError={(e) => { e.currentTarget.src = `https://fakeimg.pl/600x400/990000/fff/?text=${match.team1}+vs+${match.team2}`; }}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="text-2xl font-bold">
                        {match.team1 === 'Coming Soon' ? 'Coming Soon' : <>{match.team1} <span className="text-hcGold text-sm mx-1">VS</span> {match.team2}</>}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-300 text-sm">
                    <div className="flex items-center"><Calendar size={16} className="mr-2 text-hcRed" /> {new Date(match.matchDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="flex items-center"><Clock size={16} className="mr-2 text-hcRed" /> {match.matchTime && match.matchTime.substring(0, 5)}</div>
                  </div>
                  
                  <button 
                    onClick={() => {
                        if(match.team1 === 'Coming Soon' || isPastMatch) return;
                        navigate(`/book/${match.id}`)
                    }}
                    disabled={match.team1 === 'Coming Soon' || isPastMatch}
                    className={`w-full py-3 rounded-lg font-semibold flex justify-center items-center transition-all ${match.team1 === 'Coming Soon' ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : isPastMatch ? 'bg-gray-800 text-gray-400 cursor-not-allowed' : 'btn-primary'}`}
                  >
                    {match.team1 === 'Coming Soon' ? 'Coming Soon' : isPastMatch ? 'Match Completed' : 'Book Table (₹499)'}
                    {!(match.team1 === 'Coming Soon' || isPastMatch) && <ChevronRight size={18} className="ml-1" />}
                  </button>
                </div>
              </div>
            )})}
            
            {matches.length === 0 && (
                <div className="text-center text-gray-500 w-full py-10">No upcoming matches available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
