import { useState, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

let toastListeners: Array<(toasts: ToastMessage[]) => void> = [];
let toasts: ToastMessage[] = [];

const notifyListeners = () => {
  toastListeners.forEach((listener) => listener([...toasts]));
};

export const toast = {
  success(message: string, duration = 4000) {
    this.show(message, 'success', duration);
  },
  error(message: string, duration = 4000) {
    this.show(message, 'error', duration);
  },
  info(message: string, duration = 4000) {
    this.show(message, 'info', duration);
  },
  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 4000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, message, type, duration };
    toasts.push(newToast);
    notifyListeners();

    setTimeout(() => {
      this.dismiss(id);
    }, duration);
  },
  dismiss(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  },
};

export function useToast() {
  const [activeToasts, setActiveToasts] = useState<ToastMessage[]>(toasts);

  useEffect(() => {
    const listener = (newToasts: ToastMessage[]) => {
      setActiveToasts(newToasts);
    };
    toastListeners.push(listener);
    setActiveToasts([...toasts]);

    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  return { toasts: activeToasts, dismiss: toast.dismiss.bind(toast), toast };
}
