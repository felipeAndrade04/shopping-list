export interface ActionModalProps {
  show: boolean;
  title: string;
  successActionText: string;
  successAction: () => void;
  close: () => void;
}
