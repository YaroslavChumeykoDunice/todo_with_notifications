import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  footer?: React.ReactNode;
}

const Modal = ({ children, onClose, isOpen, title, footer }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose}>✖</button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
