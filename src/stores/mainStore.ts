import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  user: string;
}

type Actions = object;

const mainStore = create(
  persist<Store & Actions>(
    () => ({
      user: '',
    }),
    {
      name: 'main',
    }
  )
);

export default mainStore;
