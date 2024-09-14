import React, { useState, useEffect, useRef } from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }

    // Clean up when component unmounts
    return () => {
      closeModal();
    };
  }, [isOpen]);

  const openModal = () => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.style.display = 'none';
      document.body.style.overflow = 'auto';
      if (onClose) onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current && onClose) {
      closeModal();
    }
  };

  const handleEscapePress = (e) => {
    if (e.key === 'Escape' && onClose) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapePress);
    } else {
      window.removeEventListener('keydown', handleEscapePress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [isOpen]);

  return (
    <div className="modal-overlay" ref={modalRef} onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
