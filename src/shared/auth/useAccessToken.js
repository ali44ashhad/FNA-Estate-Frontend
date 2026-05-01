import { useSyncExternalStore } from 'react'
import { getAccessToken, subscribeAccessToken } from './authStorage.js'

export function useAccessToken() {
  return useSyncExternalStore(subscribeAccessToken, getAccessToken, () => null)
}

