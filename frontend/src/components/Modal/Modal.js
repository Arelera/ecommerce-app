import { createPortal } from 'react-dom';
import S from './Modal.module.scss';

export default function Modal({ modalRef, message, setClose, onClick }) {
  return createPortal(
    <div className={S.modalContainer}>
      <div ref={modalRef} className={S.modal}>
        <p>{message}</p>

        <button className={S.acceptBtn} onClick={onClick || setClose}>
          Accept
        </button>
        <button className={S.closeBtn} onClick={setClose}>
          X
        </button>
      </div>
    </div>,
    document.getElementById('modal')
  );
}
