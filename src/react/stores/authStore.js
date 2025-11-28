import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      profileImageSrc: null,
      setUser: (user) => set({ user }),
      resetUser: () => {
        set({ user: null, profileImageSrc: null })
        useAuthStore.persist.clearStorage()
      },
      setProfileImageSrc: (profileImageSrc) => set({ profileImageSrc }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        profileImageSrc: state.profileImageSrc,
      }),
    },
  ),
)
