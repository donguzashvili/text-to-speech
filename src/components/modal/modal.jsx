import React from "react";
import { createPortal } from "react-dom";

import { ReactComponent as Close } from "../../assets/icons/close.svg";

import classes from "./modal.module.css";

const Modal = ({ audios, open, closeModal }) => {
  if (!audios || !open) return <></>;

  const UXClose = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return createPortal(
    <div className={classes.modal} onClick={UXClose}>
      <div className={classes.modalWrapper}>
        <div className={classes.header}>
          <h3>Audios</h3>
          <Close onClick={closeModal} />
        </div>
        <div className={classes.audioWrapper}>
          {audios.map((el) => {
            return (
              <audio controls>
                <source src={el} type="audio/wav" />
              </audio>
            );
          })}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
