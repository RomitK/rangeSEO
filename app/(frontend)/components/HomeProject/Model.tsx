"use client";
import React, { useState } from "react";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    const handleOverlayClick = (event) => {
        // Close the modal only if the overlay itself (not its children) is clicked
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (

        <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="modal-header border-0 justify-content-end p-1">
              <button
                type="button"
                className="bg-transparent border-0"
                onClick={onClose}
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>
            {children}
        </div>
    </div>
    );
}
export default Modal;
