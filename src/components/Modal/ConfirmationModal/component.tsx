import { Button } from "@/components/Buttons";
import { DefaultModal } from "../DefaultModal";
import { ConfirmationModalProps } from "./types";

export const ConfirmationModal = ({
  open,
  setOpen,
  size,
  onConfirm,
  title,
  description,
  type,
}: ConfirmationModalProps) => {
  const handleSwitchType = () => {
    switch (type) {
      case "delete":
        return <Button btnName="Excluir" color="error" onClick={onConfirm} />;
      case "info":
        return <Button btnName="Ok" color="info" onClick={onConfirm} />;
      case "warning":
        return <Button btnName="Ok" color="warning" onClick={onConfirm} />;
      default:
        return <Button btnName="Ok" onClick={onConfirm} />;
    }
  };
  return (
    <DefaultModal open={open} size={size} className="p-4">
      <div className="w-full text-lg font-bold">{title}</div>
      <div className="w-full mt-3">{description}</div>
      <div className="w-full mt-6 flex justify-end items-center">
        <div
          onClick={() => setOpen(false)}
          className="text-center px-4 text-primary cursor-pointer"
        >
          Cancelar
        </div>
        {handleSwitchType()}
      </div>
    </DefaultModal>
  );
};
