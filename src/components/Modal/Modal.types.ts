import { ReactNode } from 'react';

export interface ModalProps {
  show: boolean;
  children: ReactNode;
  close: () => void;
}
