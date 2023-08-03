/* eslint-disable no-unused-vars */
export interface ActionModalProps {
  show: boolean;
  title: string;
  successActionText: string;
  successAction: (name: string) => Promise<void>;
  close: () => void;
}
