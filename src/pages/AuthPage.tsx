import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { Logo } from '../components/Logo';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || 'https://ewjhbfggfjlvseozixtv.supabase.co').replace(/\/$/, '');
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GL6ijpDCW4wgjJXe__oEZw_jWFNi2BN';
const SESSION_KEY = 'lumora_supabase_session_v1';

type AuthMode = 'signin' | 'signup';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');

    try {
      const isSignup = mode === 'signup';
      const response = await fetch(
        `${SUPABASE_URL}/auth/v1/${isSignup ? 'signup' : 'token?grant_type=password'}`,
        {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim(), password }),
        },
      );
      const payload = await response.json().catch(() => ({})) as Record<string, unknown>;

      if (!response.ok) {
        const message = typeof payload.msg === 'string'
          ? payload.msg
          : typeof payload.message === 'string'
            ? payload.message
            : typeof payload.error_description === 'string'
              ? payload.error_description
              : 'We could not complete that request. Check your details and try again.';
        throw new Error(message);
      }

      if (typeof payload.access_token === 'string' && typeof payload.refresh_token === 'string') {
        const expiresIn = typeof payload.expires_in === 'number' ? payload.expires_in : 3600;
        localStorage.setItem(SESSION_KEY, JSON.stringify({
          access_token: payload.access_token,
          refresh_token: payload.refresh_token,
          expires_at: Date.now() / 1000 + expiresIn,
        }));
        // Copy this browser's existing progress into the signed-in account before loading the dashboard.
        try {
          const localState = localStorage.getItem('lumora_learning_state_v1');
          if (localState) {
            await fetch('/api/progress', {
              method: 'PUT',
              headers: {
                Authorization: 'Bearer ' + payload.access_token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ state: JSON.parse(localState) }),
            });
          }
        } catch (syncError) {
          console.warn('Could not copy browser progress to the account:', syncError);
        }
        window.location.assign('/learn');
        return;
      }

      setNotice('Account request received. Check your email for a confirmation link, then return here to sign in.');
      setMode('signin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#E8EBE9] text-[#242A27] px-5 py-8 sm:py-12 flex flex-col">
      <div className="max-w-6xl w-full mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244B3C]">
          <Logo />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center py-10">
        <section className="w-full max-w-md bg-[#F8FAF9] border border-[#D6DDD8] rounded-3xl p-6 sm:p-9 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mb-6">
            <LockKeyhole className="w-6 h-6" />
          </div>
          <p className="text-xs uppercase tracking-widest font-bold text-[#68716C]">Your learning space</p>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#244B3C] mt-2">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-[#68716C] leading-relaxed mt-3">
            {mode === 'signin'
              ? 'Sign in to continue with the progress saved to your account.'
              : 'Create an account to sign in again on this device. Email confirmation may be required.'}
          </p>

          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#E8EBE9] mt-7 mb-6" role="tablist" aria-label="Account action">
            <button type="button" role="tab" aria-selected={mode === 'signin'} onClick={() => { setMode('signin'); setError(''); setNotice(''); }} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${mode === 'signin' ? 'bg-white text-[#244B3C] shadow-sm' : 'text-[#68716C] hover:text-[#244B3C]'}`}>
              Sign in
            </button>
            <button type="button" role="tab" aria-selected={mode === 'signup'} onClick={() => { setMode('signup'); setError(''); setNotice(''); }} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${mode === 'signup' ? 'bg-white text-[#244B3C] shadow-sm' : 'text-[#68716C] hover:text-[#244B3C]'}`}>
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-semibold text-[#34463D] mb-1.5">Email address</span>
              <span className="flex items-center gap-2 rounded-xl border border-[#D6DDD8] bg-white px-3.5 focus-within:ring-2 focus-within:ring-[#244B3C]/20 focus-within:border-[#244B3C]">
                <Mail className="w-4 h-4 text-[#68716C]" />
                <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full min-w-0 py-3 bg-transparent outline-none text-sm text-[#242A27] placeholder:text-[#9AA39D]" />
              </span>
            </label>
            <label className="block">
              <span className="block text-sm font-semibold text-[#34463D] mb-1.5">Password</span>
              <span className="flex items-center gap-2 rounded-xl border border-[#D6DDD8] bg-white px-3.5 focus-within:ring-2 focus-within:ring-[#244B3C]/20 focus-within:border-[#244B3C]">
                <LockKeyhole className="w-4 h-4 text-[#68716C]" />
                <input type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full min-w-0 py-3 bg-transparent outline-none text-sm text-[#242A27] placeholder:text-[#9AA39D]" />
              </span>
            </label>

            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800">{error}</p>}
            {notice && <p role="status" className="rounded-xl border border-[#D6DDD8] bg-[#E8EBE9] px-3.5 py-3 text-sm text-[#244B3C]">{notice}</p>}

            <button type="submit" disabled={busy} className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#244B3C] px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1D3D31] disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244B3C]">
              <span>{busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}</span>
              {!busy && <ArrowRight className="w-4 h-4 text-[#C6F36B] transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          <div className="mt-6 border-t border-[#D6DDD8] pt-5 space-y-3">
            <p className="text-xs text-[#68716C] leading-relaxed">Just want to try Lumora? You can start the C++ pointers demo without an account. Progress stays in this browser until you sign in.</p>
            <Link to="/learn" className="inline-flex items-center gap-2 text-sm font-bold text-[#244B3C] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Continue without signing in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};
