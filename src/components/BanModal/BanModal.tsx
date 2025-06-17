import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUserTemporarily,
  blockUserPermanently,
} from "../../features/auth/auth";
import { AppDispatch, RootState } from "../../store";
import { Modal } from "../Modal/Modal";
import Styles from "./BanModal.module.css";

interface IBanModalProps {
  userId: string;
  isPermanent: boolean;
  onClose: () => void;
}

export const BanModal = ({ userId, isPermanent, onClose }: IBanModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [reason, setReason] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const theme = useSelector((state: RootState) => state.theme.currentTheme);

  const handleSubmit = () => {
    if (isPermanent) {
      dispatch(blockUserPermanently({ userId, reason }));
    } else {
      if (!expiresAt) return alert("Укажите дату окончания");
      dispatch(blockUserTemporarily({ userId, reason, expiresAt }));
    }
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={Styles["modal"]}>
        <h2 className={Styles["modal_title"]}>
          {isPermanent ? "Перманентная блокировка" : "Временная блокировка"}
        </h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Причина блокировки"
          className={Styles["modal_text"]}
          data-theme={theme}
        />
        {!isPermanent && (
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className={Styles["modal_time"]}
            data-theme={theme}
          />
        )}
        <div>
          <button
            onClick={handleSubmit}
            className={Styles["modal_btn"]}
            data-theme={theme}
          >
            Подтвердить
          </button>
          <button
            onClick={onClose}
            className={Styles["modal_btn"]}
            data-theme={theme}
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
};
