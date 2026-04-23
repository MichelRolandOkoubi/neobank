'use client';

import { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  PieChart as PieChartIcon,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', amount: 400 },
  { name: 'Tue', amount: 300 },
  { name: 'Wed', amount: 600 },
  { name: 'Thu', amount: 800 },
  { name: 'Fri', amount: 500 },
  { name: 'Sat', amount: 900 },
  { name: 'Sun', amount: 1100 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            NeoBank Core
          </h1>
          <p className="text-gray-400 text-sm">Welcome back, Alice</p>
        </div>
        <div className="flex gap-4 items-center">
          <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Cards & Chart */}
        <div className="lg:col-span-2 space-y-8">
          {/* Balance Card */}
          <div className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Total Balance</p>
                  <h2 className="text-5xl font-bold font-mono">€1,250.00</h2>
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12.5%
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                  <ArrowUpRight className="w-5 h-5" /> Send
                </button>
                <button className="flex-1 bg-white/10 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                  <ArrowDownLeft className="w-5 h-5" /> Receive
                </button>
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <h3 className="text-lg font-semibold mb-6">Spending Activity</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '12px'}}
                    itemStyle={{color: '#fff'}}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Transactions & AI Insights */}
        <div className="space-y-8">
          {/* AI Insights Card */}
          <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <PieChartIcon className="w-20 h-20" />
            </div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
              AI Insights
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              "You spent <span className="text-indigo-400 font-bold">€150</span> on restaurants this week. Cooking at home could save you <span className="text-emerald-400 font-bold">€400/month</span>."
            </p>
            <button className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              View full report →
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <button className="text-xs text-blue-400">See all</button>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Spotify Premium', date: '22 Apr, 2026', amount: -9.99, category: 'Entertainment' },
                { name: 'Starbucks', date: '21 Apr, 2026', amount: -5.50, category: 'Food' },
                { name: 'Freelance Payment', date: '20 Apr, 2026', amount: 450.00, category: 'Income' },
                { name: 'Apple Store', date: '19 Apr, 2026', amount: -129.00, category: 'Shopping' },
              ].map((tx, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">{tx.name}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className={`text-right ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                    <p className="font-bold">{tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}€</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{tx.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
