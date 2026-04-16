import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RegistrationStatus = 'complete' | 'user_incomplete' | 'producer_incomplete' | null;

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  registrationStatus: RegistrationStatus;
}

interface AuthActions {
  setTokens: (access: string, refresh: string, status: RegistrationStatus) => void;
  setAccessToken: (access: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      registrationStatus: null,

      setTokens: (access, refresh, status) =>
        set({ accessToken: access, refreshToken: refresh, registrationStatus: status }),

      setAccessToken: (access) => set({ accessToken: access }),

      logout: () =>
        set({ accessToken: null, refreshToken: null, registrationStatus: null }),

      isAuthenticated: () => !!get().accessToken,
    }),
    { name: 'auth' },
  ),
);

export default useAuthStore;
