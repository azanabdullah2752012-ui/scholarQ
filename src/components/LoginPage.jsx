import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../lib/context';

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="login-brand">
          <div className="brand-icon-large">
            <GraduationCap size={48} color="white" />
          </div>
          <h1 className="brand-font">ScholarQ</h1>
          <p>Join the world's most elite academic community.</p>
        </div>

        <div className="login-actions">
          <button 
            className="google-login-btn" 
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" alt="google" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="email-login-btn" disabled>
            <span>Continue with Email</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <p className="login-footer">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .login-page {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-deep);
          background-image: radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%);
        }

        .login-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 48px;
          width: 100%;
          max-width: 480px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .brand-icon-large {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary) 0%, #6366F1 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
        }

        .login-brand h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }

        .login-brand p {
          color: var(--text-muted);
          margin-bottom: 40px;
        }

        .login-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .google-login-btn {
          background-color: white;
          color: #1F2937;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .google-login-btn:hover {
          background-color: #F9FAFB;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .google-login-btn img {
          width: 20px;
          height: 20px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
          margin: 8px 0;
        }

        .divider::before, .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background-color: var(--border);
        }

        .email-login-btn {
          background-color: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border);
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: not-allowed;
          opacity: 0.5;
        }

        .login-error {
          color: #EF4444;
          margin-top: 16px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .login-footer {
          margin-top: 32px;
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-top: 2px solid #4F46E5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
