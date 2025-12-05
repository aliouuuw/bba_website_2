import { useState } from "preact/hooks";

interface AdminLoginProps {
  onLogin: (password: string) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function AdminLogin({ onLogin, loading, error }: AdminLoginProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1 className="admin-title">BBA Admin</h1>
        <p className="admin-subtitle">Secure Access Portal</p>
        
        {error && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#991b1b', 
            padding: '0.75rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #fecaca',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="admin-input"
            placeholder="Enter access key..."
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            autoFocus
          />
          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
