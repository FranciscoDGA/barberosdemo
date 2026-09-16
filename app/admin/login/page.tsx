'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { SALON } from '@/lib/config/salon';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Loader2,
  AlertCircle,
  Zap,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginDemo, user, logout } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, show redirect button
  if (user) {
    return (
      <div className="min-h-screen bg-[#070a12] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Conectado!</h2>
          <p className="text-xs text-slate-400">
            Logado como <strong className="text-emerald-400">{user.name}</strong>
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => router.push('/admin')}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Acessar Painel de Gestão &rarr;
            </button>
            <button
              onClick={async () => {
                await logout();
                window.location.reload();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
            >
              Sair
            </button>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white py-2"
            >
              Voltar ao Site Principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha e-mail e senha.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const res = await loginDemo(email, password);
    setIsLoading(false);

    if (res.success) {
      router.push('/admin');
    } else {
      setErrorMessage(res.error || 'Credenciais inválidas.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* Top Bar */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Site</span>
        </Link>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" /> Modo Demo
        </span>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/60 bg-black mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/20">
            <img src="/logo.png" alt={SALON.nome} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">Painel de Gestão</h1>
          <p className="text-xs text-slate-400">
            {SALON.nome}
          </p>
        </div>

        {/* Demo Info */}
        <div className="mb-5 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2.5 text-emerald-400 text-xs">
          <Zap className="w-4 h-4 shrink-0" />
          <span>Credenciais de demonstração — não são salvas.</span>
        </div>

        {/* Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-rose-400 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail de demonstração"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de demonstração"
                required
                className="w-full pl-10 pr-11 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Validando...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Entrar no Painel</span>
              </>
            )}
          </button>
        </form>

      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-slate-500 mt-6">
        {SALON.nome} &bull; Modo Demonstração
      </div>
    </div>
  );
}
