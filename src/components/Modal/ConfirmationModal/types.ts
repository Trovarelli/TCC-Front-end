export interface ConfirmationModalProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    size?: "sm" | "md" | "lg";
    onConfirm: () => void;
    type?: "delete" | "info" | "warning";
    title: string;
    description: string;
  }

