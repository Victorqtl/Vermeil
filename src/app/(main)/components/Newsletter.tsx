'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would connect to a newsletter service
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Rejoignez notre newsletter
          </h2>
          <p className="text-white/80 mb-8">
            Recevez nos articles, sélections et conseils directement dans votre boîte mail, deux fois par mois.
          </p>

          {subscribed ? (
            <div className="bg-white/10 p-6 rounded-sm">
              <p className="text-lg">
                Merci pour votre inscription ! 
                <br />
                <span className="text-white/70 text-base">Vous recevrez prochainement nos actualités.</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 focus:border-white text-white placeholder-white/50 outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-medium flex items-center justify-center hover:bg-gray-200 transition-colors group"
              >
                S'inscrire
                <Send size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
          
          <p className="text-white/60 text-sm mt-4">
            En vous inscrivant, vous acceptez de recevoir nos emails et confirmez avoir lu notre politique de confidentialité.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;