import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  profileImageSrc: null,
  loading: true,
  setUser: (user) => set({ user }),
  resetUser: () => {
    set({ user: null, profileImageSrc: null })
  },
  setProfileImageSrc: (profileImageSrc) => set({ profileImageSrc }),
  setLoading: (loading) => set({ loading }),
}))
