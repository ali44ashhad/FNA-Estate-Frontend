import { useEffect, useState } from 'react'
import { listProjects } from '../../../shared/api/projects.js'

export function useProjectsList(filters) {
  const [state, setState] = useState({ loading: true, error: '', items: [], meta: null })

  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true, error: '' }))

    listProjects(filters)
      .then(({ items, meta }) => {
        if (!alive) return
        setState({ loading: false, error: '', items, meta })
      })
      .catch((e) => {
        if (!alive) return
        setState({ loading: false, error: e?.message || 'Failed to load projects', items: [], meta: null })
      })

    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters || {})])

  return state
}

