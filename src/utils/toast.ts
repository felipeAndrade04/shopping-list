import EventManager from './EvenManager';

export type ToastType = 'success' | 'info' | 'error';

export interface Toast {
  id?: string;
  type: ToastType;
  text: string;
  duration?: number;
}

export const toastEventManager = new EventManager();

export default function toast({ type, text, duration }: Toast) {
  toastEventManager.emit<Toast>('addtoast', {
    id: new Date().getTime().toString(),
    type,
    text,
    duration,
  });
}
