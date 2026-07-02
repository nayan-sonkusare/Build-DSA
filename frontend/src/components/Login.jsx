// frontend/src/components/Login.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginAnimation from "./LoginAnimation";





const API = "http://localhost:4000/api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [active, setActive] = useState("signup");
  const [loading, setLoading] = useState(false);

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  // ---------- LOGIN REFS (FIX: use refs so we can overwrite DOM autofill) ----------
  const loginIdRef = useRef(null);      // FIX: login input ref
  const loginPassRef = useRef(null);    // FIX: password input ref

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // 🔹 CLEAR OLD SESSION (optional)
  useEffect(() => {
    localStorage.removeItem("currentUser");
  }, []);

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------------- SIGNUP ----------------
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signup.agree) {
      alert("Please accept terms & conditions");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signup.name.trim(),
          email: signup.email.trim(),
          password: signup.password,
        }),
      });

      if (!res.ok) throw new Error("Signup failed");

      alert("Signup successful — please login");
      setSignup({ name: "", email: "", password: "", agree: false });
      setActive("login");
    } catch (err) {
      alert("Signup error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGIN SUBMIT (reads from refs) ----------------
  // ---------------- LOGIN SUBMIT ----------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FIX: Add .trim() to remove accidental spaces
    const identifier = loginIdRef.current ? loginIdRef.current.value.trim() : "";
    const password = loginPassRef.current ? loginPassRef.current.value : "";

    try {
      const res = await fetch(`${API}/login`, {
        // ... rest of your fetch code stays exactly the same
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // backend expects identifier & password
          identifier,
          password,
        }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      alert("Login error");
    } finally {
      setLoading(false);
    }
  };

  // ---------- FORCE-CLEAR DOM AUTOFILLED VALUES AFTER MOUNT ----------
  useEffect(() => {
    // Chrome sometimes injects values immediately. Overwrite them after a tiny delay.
    const t = setTimeout(() => {
      try {
        if (loginIdRef.current) {
          loginIdRef.current.value = "";
          // also remove any placeholder "autofill" mark attributes
          loginIdRef.current.removeAttribute("data-autofill");
        }
        if (loginPassRef.current) {
          loginPassRef.current.value = "";
          loginPassRef.current.removeAttribute("data-autofill");
        }
      } catch (e) {
        // ignore
      }
    }, 80); // 80ms is enough to let browser autofill then we overwrite it
    return () => clearTimeout(t);
  }, [active]); // also run when user toggles between signup/login

  return (
    <>
       <LoginAnimation />

      {/* FIX: global hidden input to absorb aggressive autofill */}
      <input
        type="text"
        name="chrome_killer_global"
        value=""
        readOnly
        style={{ position: "absolute", top: "-1000px", left: "-1000px" }}
      />

      <main className="pt-1 bg-black min-h-screen text-base-content">
        <div className="flex justify-center mt-6">
          <div className="rounded-full bg-base-300 border shadow px-2 py-2 flex gap-2">
            <button
              onClick={() => setActive("signup")}
              className={`px-6 py-2 rounded-full font-semibold ${
                active === "signup" ? "bg-primary text-primary-content" : ""
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setActive("login")}
              className={`px-6 py-2 rounded-full font-semibold ${
                active === "login" ? "bg-primary text-primary-content" : ""
              }`}
            >
              Login
            </button>
          </div>
        </div>

        <div className="flex justify-center py-12 px-4">
          <div className="w-full max-w-md bg-base-300 p-8 rounded-xl shadow">

            {/* ================= SIGNUP FORM (unchanged) ================= */}
            {active === "signup" ? (
              <form
                className="space-y-4"
                onSubmit={handleSignupSubmit}
                autoComplete="off"
              >
                <input type="text" name="fakeuser_signup" style={{ display: "none" }} />
                <input type="password" name="fakepass_signup" style={{ display: "none" }} />

                <input
                  name="name"
                  value={signup.name}
                  onChange={handleSignupChange}
                  placeholder="Username"
                  autoComplete="off"
                  className="input input-bordered w-full"
                />

                <input
                  name="email"
                  value={signup.email}
                  onChange={handleSignupChange}
                  placeholder="Email"
                  autoComplete="off"
                  className="input input-bordered w-full"
                />

                <div className="relative">
                  <input
                    name="password"
                    value={signup.password}
                    onChange={handleSignupChange}
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="new-password"
                    className="input input-bordered w-full pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showSignupPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={signup.agree}
                    onChange={handleSignupChange}
                  />
                  I agree to terms & privacy policy
                </label>

                <button className="btn btn-primary w-full" disabled={loading}>
                  {loading ? "Please wait..." : "REGISTER"}
                </button>
              </form>
            ) : (
              /* ================= LOGIN FORM (FIXED: refs + overwrite) ================= */
              <form
                className="space-y-4"
                onSubmit={handleLoginSubmit}
                autoComplete="off"
              >
                {/* fake inputs to capture aggressive autofill attempts */}
                <input type="text" name="fake_user_login" style={{ display: "none" }} />
                <input type="password" name="fake_pass_login" style={{ display: "none" }} />

                {/* NOTE: name attributes are intentionally non-standard to avoid heuristic detection */}
                <input
                  name="login_id_x9"                 // FIX: nonstandard name
                  ref={loginIdRef}                   // FIX: ref attached
                  defaultValue=""                    // uncontrolled input (so browser injected value can be overwritten)
                  placeholder="Username or Email"
                  autoComplete="off"
                  className="input input-bordered w-full"
                  // adding spellCheck/off to reduce any browser hints
                  spellCheck="false"
                />

                <div className="relative">
                  <input
                    name="login_secret_x9"           // FIX: nonstandard name
                    ref={loginPassRef}               // FIX: ref attached
                    defaultValue=""
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="new-password"
                    className="input input-bordered w-full pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showLoginPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <button className="btn btn-primary w-full" disabled={loading}>
                  {loading ? "Please wait..." : "LOGIN"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      
    </>
  );
}
