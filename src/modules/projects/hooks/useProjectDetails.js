import { useEffect, useState } from 'react'
import { getProjectById } from '../../../shared/api/projects.js'

export function useProjectDetails(id) {
  const [state, setState] = useState({ loading: true, error: '', item: null })

  useEffect(() => {
    const projectId = typeof id === 'string' ? id.trim() : ''
    let alive = true

    if (!projectId) {
      setState({ loading: false, error: 'Invalid project id', item: null })
      return () => {
        alive = false
      }
    }

    setState((s) => ({ ...s, loading: true, error: '' }))

    getProjectById(projectId)
      .then((item) => {
        if (!alive) return
        setState({ loading: false, error: '', item })
      })
      .catch((e) => {
        if (!alive) return
        setState({ loading: false, error: e?.message || 'Failed to load project', item: null })
      })

    return () => {
      alive = false
    }
  }, [id])

  return state
}

