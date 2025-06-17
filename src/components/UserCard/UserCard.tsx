import Styles from "./UserCard.module.css";
import no_avatar from "../../assets/no_avatar.png";
import { useState } from "react";
import { BanModal } from "../BanModal/BanModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

interface IUserCardProps {
  _id: string;
  avatar: string;
  name: string;
  surname: string;
  login: string;
  email: string;
  isBlocked: boolean;
  blockReason?: string;
  blockExpiresAt?: string | null;
}

export const UserCard = ({
  _id,
  avatar,
  name,
  surname,
  login,
  email,
  isBlocked,
  blockReason,
  blockExpiresAt,
}: IUserCardProps) => {
  const [modalType, setModalType] = useState<"temp" | "perm" | null>(null);
  const theme = useSelector((state: RootState) => state.theme.currentTheme);

  const getBlockInfo = () => {
    if (!isBlocked) return null;
    if (blockExpiresAt) {
      const expires = new Date(blockExpiresAt).toLocaleString();
      return `Заблокирован до ${expires}`;
    }
    return `Заблокирован навсегда`;
  };

  return (
    <div className={Styles["user_item"]} key={_id} data-theme={theme}>
      <img
        src={avatar ? `http://localhost:3333${avatar}` : no_avatar}
        alt="avatar"
        className={Styles["user_avatar"]}
      />
      <div className={Styles["user_text_info"]}>
        <p className={Styles["user_login"]}>ID: {_id}</p>
        <p className={Styles["user_login"]}>Имя: {name}</p>
        <p className={Styles["user_email"]}>Фамилия: {surname}</p>
        <p className={Styles["user_login"]}>Логин: {login}</p>
        <p className={Styles["user_email"]}>Email: {email}</p>
        {isBlocked && (
          <div className={Styles["user_block_info"]}>
            <p>{getBlockInfo()}</p>
            {blockReason && <p>Причина: {blockReason}</p>}
          </div>
        )}
      </div>

      <div className={Styles["user_btns"]}>
        <button
          className={Styles["user_block"]}
          onClick={() => setModalType("temp")}
          disabled={isBlocked}
          data-theme={theme}
        >
          Временно заблокировать
        </button>
        <button
          className={Styles["user_block"]}
          onClick={() => setModalType("perm")}
          disabled={isBlocked}
          data-theme={theme}
        >
          Заблокировать навсегда
        </button>
      </div>

      {modalType && (
        <BanModal
          userId={_id}
          isPermanent={modalType === "perm"}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
};
