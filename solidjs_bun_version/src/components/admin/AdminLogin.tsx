import { createSignal, Show } from "solid-js";

interface AdminLoginProps {
  onLogin: (password: string) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function AdminLogin(props: AdminLoginProps) {
  const [password, setPassword] = createSignal("");
  const [localStatus, setLocalStatus] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const pwd = password();
    
    if (!pwd.trim()) {
      setLocalStatus("Please enter a password");
      return;
    }
    
    setLocalStatus("Connecting to server...");
    console.log("Login form submitted");
    
    try {
      await props.onLogin(pwd);
      setLocalStatus("");
    } catch (err) {
      console.error("Login error in component:", err);
      setLocalStatus("Connection failed. Please try again.");
    }
  };

  return (
    <div class="admin-login-container">
      <div class="admin-login-box">
        <h1 class="admin-title">BBA Admin</h1>
        <p class="admin-subtitle">Secure Access Portal</p>

        <Show when={props.error}>
          <div style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '0.75rem',
            'border-radius': '8px',
            'margin-bottom': '1rem',
            border: '1px solid #fecaca',
            'font-size': '0.875rem'
          }}>
            {props.error}
          </div>
        </Show>

        <Show when={localStatus() && !props.error}>
          <div style={{
            background: '#dbeafe',
            color: '#1e40af',
            padding: '0.75rem',
            'border-radius': '8px',
            'margin-bottom': '1rem',
            border: '1px solid #93c5fd',
            'font-size': '0.875rem'
          }}>
            {localStatus()}
          </div>
        </Show>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            class="admin-input"
            placeholder="Enter access key..."
            value={password()}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            autofocus
            disabled={props.loading}
          />
          <button
            type="submit"
            class="admin-btn"
            disabled={props.loading}
            style={{
              opacity: props.loading ? "0.7" : "1",
              cursor: props.loading ? "not-allowed" : "pointer"
            }}
          >
            {props.loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>

        <Show when={props.loading}>
          <div style={{
            'margin-top': '1rem',
            'text-align': 'center',
            color: '#64748b',
            'font-size': '0.875rem'
          }}>
            <span style={{
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }}>
              ⏳ Please wait...
            </span>
          </div>
        </Show>
      </div>
    </div>
  );
}
