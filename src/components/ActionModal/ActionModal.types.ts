/* eslint-disable no-unused-vars */
export interface ActionModalProps {
  show: boolean;
  title: string;
  successActionText: string;
  isLoading: boolean;
  successAction: (name: string) => Promise<void>;
  close: () => void;
}
