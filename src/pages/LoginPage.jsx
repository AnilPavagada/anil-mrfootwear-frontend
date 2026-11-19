import { useState } from 'react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Headset,
  ImagePlus,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Truck,
} from 'lucide-react'

function LoginPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('')

  const isRegistering = activeTab === 'register'

  const changeTab = (tab) => {
    setActiveTab(tab)
    setStatus('')
    setShowPassword(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const password = formData.get('password')

    if (isRegistering && password !== formData.get('confirmPassword')) {
      setStatus('Your passwords do not match. Please check and try again.')
      return
    }

    setStatus(
      isRegistering
        ? 'Registration is not connected yet.'
        : 'Sign-in is not connected yet.'
    )
  }

  const handleGoogleSignIn = () => {
    setStatus('Google sign-in is not configured yet.')
  }

  return (
    <section aria-label="MR Footwear account access">
      <div className="grid lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative isolate order-2 flex flex-col justify-center overflow-hidden bg-[#101010] px-5 py-12 text-white sm:px-10 lg:order-1 lg:px-14 lg:py-16 xl:px-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(125deg,#101010_0%,#101010_52%,#25140b_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-36 top-0 -z-10 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl"
          />

          <div className="mx-auto w-full max-w-xl">
            <p className="text-3xl font-black uppercase leading-tight sm:text-5xl">
              MR <span className="text-orange-500">FOOTWEAR</span>
            </p>
            <p className="mt-4 text-lg font-medium text-gray-200 sm:text-2xl">
              Step into style.
              <br />
              Walk with confidence.
            </p>
            <span className="mt-5 block h-1 w-24 rounded-full bg-orange-500" />

            <figure
              aria-label="Space for your footwear image"
              className="relative mx-auto mt-8 w-full max-w-lg sm:mt-10"
            >
              <div className="relative flex aspect-[4/3] min-h-56 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_72%_28%,rgba(249,115,22,0.28),transparent_35%),linear-gradient(135deg,#252525,#111111_65%,#26160f)] shadow-2xl shadow-black/50 sm:min-h-72">
                <div
                  aria-hidden="true"
                  className="absolute inset-4 rounded-2xl border border-dashed border-white/20 sm:inset-7"
                />
                <div className="relative flex max-w-xs flex-col items-center px-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/10 text-orange-400">
                    <ImagePlus size={30} strokeWidth={1.6} />
                  </span>
                  <p className="mt-4 text-base font-bold text-white sm:text-lg">
                    Your footwear image goes here
                  </p>
                  <p className="mt-2 text-xs leading-5 text-gray-400 sm:text-sm">
                    Replace this image area with your favorite shoe or store
                    photo.
                  </p>
                </div>
                <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-300">
                  MR Footwear
                </span>
              </div>
            </figure>

            <div className="mt-6 grid grid-cols-3 divide-x divide-white/15 border-t border-white/10 pt-5">
              {[
                { icon: ShieldCheck, label: 'Quality choices' },
                { icon: Truck, label: 'Easy shopping' },
                { icon: Headset, label: 'Friendly support' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 px-2 text-center"
                >
                  <Icon size={23} className="text-orange-500" />
                  <span className="text-[11px] font-semibold text-gray-300 sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="order-1 flex items-center justify-center bg-[radial-gradient(ellipse_at_80%_10%,#fff7ed_0%,#f3f4f6_45%)] px-4 py-8 sm:px-8 sm:py-12 lg:order-2 lg:px-10">
          <div
            id="account-form"
            className="w-full max-w-[460px] rounded-3xl border border-white bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
          >
            <div className="px-5 pt-5 sm:px-8 sm:pt-8">
              <div className="mb-6 text-center">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">
                  MR Footwear account
                </span>
              </div>
              <div
                role="tablist"
                aria-label="Choose account action"
                className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1"
              >
                {[
                  { id: 'login', label: 'Login' },
                  { id: 'register', label: 'Register' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => changeTab(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                      activeTab === tab.id
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
                  {isRegistering ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {isRegistering
                    ? 'Sign up to stay in touch with MR Footwear.'
                    : 'Enter your details to sign in to your account.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {isRegistering && (
                  <div>
                    <label
                      htmlFor="register-name"
                      className="mb-1.5 block text-xs font-semibold text-gray-700"
                    >
                      Full name
                    </label>
                    <input
                      id="register-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={80}
                      placeholder="Your name"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-1.5 block text-xs font-semibold text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={17}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <label
                      htmlFor="login-password"
                      className="text-xs font-semibold text-gray-700"
                    >
                      Password
                    </label>
                    {!isRegistering && (
                      <button
                        type="button"
                        onClick={() =>
                          setStatus(
                            'Password reset is not available yet. Please contact the store.'
                          )
                        }
                        className="text-xs font-semibold text-orange-600 transition hover:text-orange-700"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={
                        isRegistering ? 'new-password' : 'current-password'
                      }
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {isRegistering ? (
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-1.5 block text-xs font-semibold text-gray-700"
                    >
                      Confirm password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      placeholder="Re-enter your password"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <label className="inline-flex items-center gap-2 text-gray-600">
                      <input
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 accent-orange-500"
                      />
                      Remember me
                    </label>
                  </div>
                )}

                {status && (
                  <p
                    role="status"
                    className="rounded-lg bg-orange-50 p-3 text-sm leading-5 text-orange-800"
                  >
                    {status}
                    {status.includes('not connected') ||
                    status.includes('not configured') ||
                    status.includes('not available') ? (
                      <>
                        {' '}
                        <a
                          href="/contact"
                          className="font-bold underline"
                        >
                          Contact us
                        </a>
                      </>
                    ) : null}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  {isRegistering ? 'Create account' : 'Login'}
                  <ArrowRight size={17} />
                </button>
              </form>

              {!isRegistering && (
                <>
                  <div className="my-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-gray-200" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                      or continue with
                    </span>
                    <span className="h-px flex-1 bg-gray-200" />
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-[conic-gradient(from_-45deg,#4285F4_0deg_90deg,#34A853_90deg_180deg,#FBBC05_180deg_270deg,#EA4335_270deg_360deg)] bg-clip-text text-xl font-black text-transparent"
                    >
                      G
                    </span>
                    Continue with Google
                  </button>
                </>
              )}

              <p className="mt-5 rounded-lg bg-gray-50 px-3 py-2.5 text-center text-[11px] leading-5 text-gray-500">
                Sign-in and Google authentication will be available once an
                authentication service is connected.
              </p>

              <p className="mt-4 border-t border-gray-100 pt-4 text-center text-sm text-gray-600">
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => changeTab(isRegistering ? 'login' : 'register')}
                  className="font-bold text-orange-600 hover:text-orange-700"
                >
                  {isRegistering ? 'Login' : 'Register here'}
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default LoginPage
