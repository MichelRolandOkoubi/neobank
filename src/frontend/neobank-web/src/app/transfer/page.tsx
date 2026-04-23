'use client';

import { useState } from 'react';
import { ArrowLeft, Send, ShieldCheck, Info } from 'lucide-react';
import Link from 'next/link';

export default function TransferPage() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Transfer successful!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-2">Send Money</h2>
          <p className="text-gray-400 mb-8">Instant transfer to any NeoBank account.</p>

          <form onSubmit={handleTransfer} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Recipient Account ID</label>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. neobank_9921_x2"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Amount (EUR)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono">€</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-2xl font-mono placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 flex gap-4">
              <Info className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-sm text-gray-400">
                Transfers are processed instantly using our <span className="text-blue-400 font-bold">Native AOT</span> engine with less than 50ms latency.
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Confirm Transfer
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure transaction encrypted with SHA-256
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
