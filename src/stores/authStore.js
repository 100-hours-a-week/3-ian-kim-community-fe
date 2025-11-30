import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      userId: null,
      profileImageName: null,
      profileImageSrc: null,
      loading: true,
      setUserId: (userId) => set((prev) => ({ userId })),
      resetUser: () => {
        set((prev) => ({ userId: null, profileImageSrc: null, profileImageName: null }))
        useAuthStore.persist.clearStorage()
      },
      setProfileImageName: (name) => set((prev) => ({ profileImageName: name })),
      setProfileImageSrc: (profileImageSrc) => set((prev) => ({ profileImageSrc })),
      setLoading: (loading) => set((prev) => ({ loading })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        profileImageName: state.profileImageName,
      }),
    },
  ),
)
