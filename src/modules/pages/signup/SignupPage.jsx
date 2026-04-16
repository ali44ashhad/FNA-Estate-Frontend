import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'
import { request } from '../../../shared/api/http.js'
import { setAccessToken } from '../../../shared/auth/authStorage.js'
import { requestGoogleAuthCode } from '../../../shared/auth/googleOAuth.js'

function GoogleMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.74 1.22 9.28 3.62l6.9-6.9C36.08 2.44 30.37 0 24 0 14.64 0 6.57 5.38 2.67 13.22l8.02 6.23C12.57 13.37 17.85 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.96-2.2 5.46-4.66 7.14l7.52 5.83C43.82 37.62 46.5 31.53 46.5 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.69 28.45c-.5-1.48-.79-3.06-.79-4.7s.29-3.22.79-4.7l-8.02-6.23C.98 16.28 0 20.02 0 23.75c0 3.73.98 7.47 2.67 10.93l8.02-6.23z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.37 0 12.08-2.1 16.1-5.7l-7.52-5.83c-2.09 1.4-4.76 2.23-8.58 2.23-6.15 0-11.43-3.87-13.31-9.45l-8.02 6.23C6.57 42.62 14.64 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  )
}

function OAuthButton({ children, disabled, onClick }) {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isDisabled = useMemo(() => {
    return (
      isSubmitting ||
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    )
  }, [confirmPassword, email, isSubmitting, name, password])

  async function onSubmit(e) {
    e.preventDefault()
    if (isSubmitting) return

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsSubmitting(true)
    setError('')
    try {
      await request('/api/auth/register', {
        method: 'POST',
        body: { name: name.trim(), email: email.trim(), password },
      })

      const res = await request('/api/auth/login', {
        method: 'POST',
        body: { email: email.trim(), password },
      })

      const accessToken = res?.data?.accessToken
      if (!accessToken) throw new Error('Signup failed')

      setAccessToken(accessToken)
      navigate(ROUTES.home)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onGoogle() {
    setIsSubmitting(true)
    setError('')
    try {
      const code = await requestGoogleAuthCode()
      const res = await request('/api/auth/google/code', { method: 'POST', body: { code } })

      const accessToken = res?.data?.accessToken
      if (!accessToken) throw new Error('Google sign-in failed')

      setAccessToken(accessToken)
      navigate(ROUTES.home)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <Container className="relative flex w-full items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="lg:pt-10">
            <Link
              to={ROUTES.home}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-900"
            >
              <span aria-hidden>←</span> Back to home
            </Link>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-emerald-900/80">
              Create an account
            </p>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create your account.
            </h1>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-slate-600">
              Save projects, build a shortlist, and get updates from our advisory desk.
            </p>

            <div className="mt-6 max-w-prose rounded-2xl border border-slate-200/70 bg-white/60 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">Why create an account?</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-emerald-100 text-center text-[12px] font-bold leading-5 text-emerald-900">
                    ✓
                  </span>
                  <span>Track your favourite projects in one place.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-emerald-100 text-center text-[12px] font-bold leading-5 text-emerald-900">
                    ✓
                  </span>
                  <span>Get updates when new properties match your needs.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-emerald-100 text-center text-[12px] font-bold leading-5 text-emerald-900">
                    ✓
                  </span>
                  <span>Enquire faster with saved details.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:flex lg:justify-end">
            <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-1">
                <div className="grid grid-cols-2 gap-1 text-sm font-semibold">
                  <Link
                    to={ROUTES.login}
                    className="rounded-xl px-3 py-2 text-center text-slate-700 hover:bg-white hover:text-slate-900"
                  >
                    Log in
                  </Link>
                  <span className="rounded-xl bg-white px-3 py-2 text-center text-slate-900 shadow-sm">Sign up</span>
                </div>
              </div>

              <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium text-slate-800">
                    Full name
                  </label>
                  <input
                    id="signup-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-slate-800">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-slate-800">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-slate-800">
                    Confirm password
                  </label>
                  <input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    placeholder="Repeat password"
                  />
                </div>

                <div aria-live="polite">
                  {password && confirmPassword && password !== confirmPassword ? (
                    <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
                      Passwords do not match.
                    </p>
                  ) : null}

                  {error ? (
                    <p className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">{error}</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full rounded-xl bg-emerald-800 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Creating…' : 'Create account'}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Or sign up with</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="space-y-3">
                <OAuthButton disabled={isSubmitting} onClick={onGoogle}>
                  <GoogleMark />
                  <span>Continue with Google</span>
                </OAuthButton>
              </div>

              <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
                By creating an account, you agree to our{' '}
                <Link to={ROUTES.terms} className="font-semibold text-slate-700 hover:text-emerald-900">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to={ROUTES.privacy} className="font-semibold text-slate-700 hover:text-emerald-900">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

