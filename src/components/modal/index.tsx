import React from "react";
import "./styles.css";

interface ModalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedProductId: string) => Promise<void>;
  selectedProductId: string;
  productTypeId: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedProductId,
  productTypeId,
}) => {
  const handleConfirmClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    await onConfirm(productTypeId);
    onClose();
  };

  const handleCancelClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <p>Вы уверены, что хотите удалить этот продукт?</p>
        <button className="modal-button" onClick={handleConfirmClick}>
          Да
        </button>
        <button className="modal-button" onClick={handleCancelClick}>
          Нет
        </button>
      </div>
    </div>
  ) : null;
};

export default ModalPopup;
