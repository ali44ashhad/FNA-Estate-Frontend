import { useEffect, useMemo, useRef, useState } from 'react'
import { request } from '../../../shared/api/http.js'
import { getCategoryLabel, getSubTypeLabel } from '../../../shared/constants/projectTypes.js'
import { clearAccessToken } from '../../../shared/auth/authStorage.js'

function normalizeKey(raw) {
  return typeof raw === 'string' ? raw.trim() : ''
}

function buildInterestTitle(interest) {
  const category = normalizeKey(interest?.category)
  const subType = normalizeKey(interest?.subType)
  const apartmentConfig = normalizeKey(interest?.apartmentConfig)

  const categoryLabel = category ? getCategoryLabel(category) : ''
  if (category === 'residential' && subType === 'apartment') {
    return [categoryLabel || 'Residential', 'Apartment', apartmentConfig || '—'].filter(Boolean).join(' · ')
  }

  return [categoryLabel, subType ? getSubTypeLabel(subType) : '—'].filter(Boolean).join(' · ')
}

export default function LeadEnquiryModal({ open, onClose, project, interest, onAuthRequired }) {
  const dialogRef = useRef(null)
  const [profile, setProfile] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)
  const [phone, setPhone] = useState('')

  const projectName = typeof project?.name === 'string' ? project.name.trim() : ''
  const projectId = typeof project?.id === 'string' ? project.id : project?.id

  const preferenceTitle = useMemo(() => buildInterestTitle(interest), [interest])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    setError('')
    setSuccess(null)
    setPhone('')
  }, [open, onAuthRequired])

  useEffect(() => {
    if (!open) return
    let cancelled = false

    async function run() {
      setLoadingProfile(true)
      setError('')
      try {
        const res = await request('/api/users/me', { auth: true })
        const user = res?.data
        if (!cancelled) setProfile(user || null)
      } catch (err) {
        if (err && typeof err === 'object' && err.status === 401) {
          clearAccessToken()
          if (!cancelled) onAuthRequired?.()
          return
        }
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load profile')
      } finally {
        if (!cancelled) setLoadingProfile(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [open])

  async function onSubmit(e) {
    e.preventDefault()
    if (submitting) return
    if (!projectId) {
      setError('Missing project id')
      return
    }

    const normalizedPhone = typeof phone === 'string' ? phone.replace(/\D/g, '').trim() : ''
    if (!/^\d{10}$/.test(normalizedPhone)) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    const category = normalizeKey(interest?.category)
    const subType = normalizeKey(interest?.subType)
    const apartmentConfig = normalizeKey(interest?.apartmentConfig)
    const unitTypeKey = normalizeKey(interest?.unitTypeKey)
    const unitTypeLabel = normalizeKey(interest?.unitTypeLabel)

    if (!category || !subType) {
      setError('Missing preference details')
      return
    }
    if (category === 'residential' && subType === 'apartment' && !apartmentConfig) {
      setError('Missing apartment configuration')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      const payload = {
        projectId: String(projectId),
        phone: normalizedPhone,
        interest: {
          category,
          subType,
          ...(apartmentConfig ? { apartmentConfig } : {}),
          ...(unitTypeKey ? { unitTypeKey } : {}),
          ...(unitTypeLabel ? { unitTypeLabel } : {}),
        },
      }

      const res = await request('/api/leads', { method: 'POST', body: payload, auth: true })
      setSuccess(res?.data || { ok: true })
    } catch (err) {
      if (err && typeof err === 'object' && err.status === 401) {
        clearAccessToken()
        onAuthRequired?.()
        return
      }
      setError(err instanceof Error ? err.message : 'Could not create lead')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-slate-950/40"
        aria-label="Close modal"
        onClick={() => onClose?.()}
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900/80">Lead enquiry</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">Confirm your preference</h2>
            <p className="mt-1 text-sm text-slate-600">
              We’ll share availability and next steps for <span className="font-semibold text-slate-800">{projectName || 'this project'}</span>.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
            onClick={() => onClose?.()}
          >
            <span aria-hidden>✕</span>
          </button>
        </div>

        <div className="px-6 py-5">
          {error ? (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
          ) : null}

          {success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
              <p className="text-sm font-semibold text-emerald-900">Lead created</p>
              <p className="mt-1 text-sm text-emerald-800">
                Our advisory desk will reach out shortly{typeof success?.leadNo === 'number' ? ` (Lead #${success.leadNo}).` : '.'}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded-xl bg-emerald-800 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
                  onClick={() => onClose?.()}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preference</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{preferenceTitle || '—'}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Account</p>
                {loadingProfile ? (
                  <p className="mt-2 text-sm text-slate-600">Loading your profile…</p>
                ) : profile ? (
                  <div className="mt-2 space-y-1 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Name:</span> {profile?.name || '—'}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Email:</span> {profile?.email || '—'}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-600">We couldn’t load your profile. You can still try submitting the enquiry.</p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
                <div className="mt-2">
                  <label className="sr-only" htmlFor="lead-phone">
                    Phone number
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10-digit phone number"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10"
                    value={phone}
                    onChange={(e) => {
                      const digits = String(e.target.value || '').replace(/\D/g, '').slice(0, 10)
                      setPhone(digits)
                    }}
                    disabled={submitting}
                  />
                  <p className="mt-2 text-xs text-slate-500">We’ll use this number to contact you about availability and next steps.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  onClick={() => onClose?.()}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting…' : 'Submit enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

