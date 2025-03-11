import { create } from 'zustand';

export interface NavState {
  subject: undefined | string;
  isOpen: undefined | boolean;
  isMobile: undefined | boolean;
  handleOpen: (status: { subject: undefined | string; state: boolean }) => void;
  handleMobile: (navigator: string) => void;
}

const useSubStore = create<NavState>((set, get) => ({
  subject: undefined,
  isOpen: undefined,
  isMobile: undefined,
  handleOpen: (status) => {
    set((state) => ({
      subject: status.subject,
      isOpen: status.state,
    }));
    return;
  },
  handleMobile: (navigator) => {
    set((state) => ({
      isMobile: /Mobi/i.test(navigator),
    }));
  },
}));

export default useSubStore;
