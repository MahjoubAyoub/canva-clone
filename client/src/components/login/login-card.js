"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";

function LoginCard() {
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });
  const [signupForm, setSignupForm] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState(0); // 0: email, 1: code, 2: new password, 3: done
  const [forgotCode, setForgotCode] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSignupChange = (e) => {
    setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Use NextAuth credentials provider for login
      const res = await signIn("credentials", {
        redirect: false,
        identifier: loginForm.identifier,
        password: loginForm.password,
      });
      if (res?.error) {
        setError(res.error || "Login failed");
      } else if (res?.ok) {
        window.location.href = "/dashboard-user";
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004"}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Signup failed");
      } else {
        setTab("login");
        setError("");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
    setLoading(false);
  };

  // Forgot password handlers
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004"}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      setForgotStep(1);
    } catch (err) {
      setForgotError(err.message);
    }
    setForgotLoading(false);
  };

  const handleForgotCodeSubmit = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    try {
      // Just move to next step, validation is in next step
      setForgotStep(2);
    } catch (err) {
      setForgotError("Invalid code");
    }
    setForgotLoading(false);
  };

  const handleForgotResetSubmit = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004"}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, code: forgotCode, newPassword: forgotNewPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      setForgotStep(3);
    } catch (err) {
      setForgotError(err.message);
    }
    setForgotLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 transition-all duration-300">
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">Jump in!</h3>
          <p className="mt-3 text-gray-500">Sign in to Designih</p>
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <Button variant={tab === "login" ? "default" : "outline"} onClick={() => setTab("login")}>
            Login
          </Button>
          <Button variant={tab === "signup" ? "default" : "outline"} onClick={() => setTab("signup")}>
            Sign Up
          </Button>
        </div>
        {showForgot ? (
          <div>
            {forgotStep === 0 && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <Input
                  name="forgotEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
                {forgotError && <div className="text-red-500 text-sm">{forgotError}</div>}
                <Button type="submit" className="w-full" disabled={forgotLoading}>
                  {forgotLoading ? "Sending code..." : "Send code"}
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgot(false)}>
                  Back to Login
                </Button>
              </form>
            )}
            {forgotStep === 1 && (
              <form onSubmit={handleForgotCodeSubmit} className="space-y-4">
                <Input
                  name="forgotCode"
                  placeholder="Enter 6-digit code"
                  value={forgotCode}
                  onChange={(e) => setForgotCode(e.target.value)}
                  required
                />
                {forgotError && <div className="text-red-500 text-sm">{forgotError}</div>}
                <Button type="submit" className="w-full" disabled={forgotLoading}>
                  {forgotLoading ? "Verifying..." : "Verify code"}
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgot(false)}>
                  Back to Login
                </Button>
              </form>
            )}
            {forgotStep === 2 && (
              <form onSubmit={handleForgotResetSubmit} className="space-y-4">
                <Input
                  name="forgotNewPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  required
                />
                {forgotError && <div className="text-red-500 text-sm">{forgotError}</div>}
                <Button type="submit" className="w-full" disabled={forgotLoading}>
                  {forgotLoading ? "Resetting..." : "Reset Password"}
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgot(false)}>
                  Back to Login
                </Button>
              </form>
            )}
            {forgotStep === 3 && (
              <div className="text-center space-y-4">
                <div className="text-green-600 font-semibold">Password reset successful!</div>
                <Button className="w-full" onClick={() => { setShowForgot(false); setForgotStep(0); }}>
                  Back to Login
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  name="identifier"
                  placeholder="Email or Username"
                  value={loginForm.identifier}
                  onChange={handleLoginChange}
                  required
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  required
                />
                <Input
                  name="username"
                  placeholder="Username"
                  value={signupForm.username}
                  onChange={handleSignupChange}
                  required
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  required
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            </div>
          </>
        )}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Button
          variant={"outline"}
          className={`w-full flex items-center justify-center gap-3 py-6 text-gray-700 border-gray-300 
            hover:border-[#8b3dff] hover:text-[#8b3dff] transition-all duration-300 group transform hover:scale-[1.01] active:scale-[0.99]
            `}
          onClick={() => signIn("google", { callbackUrl: "/dashboard-user" })}
        >
          <div className="bg-white rounded-full p-1 flex items-center justify-center group-hover:bg-[#8b3dff]/10 transition-colors duration-300">
            <LogIn className="w-5 h-5 group-hover:text-[#8b3dff] transition-colors duration-300" />
          </div>
          <span className="font-medium">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
}

export default LoginCard;
