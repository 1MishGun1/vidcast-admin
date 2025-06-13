import Styles from "./UserCard.module.css";
import no_avatar from "../../assets/no_avatar.png";

interface IUserCardProps {
  _id: string;
  avatar: string;
  name: string;
  surname: string;
  login: string;
  email: string;
}

export const UserCard = ({
  _id,
  avatar,
  name,
  surname,
  login,
  email,
}: IUserCardProps) => {
  return (
    <div className={Styles["user_item"]} key={_id}>
      <img
        src={avatar ? `http://localhost:3333${avatar}` : no_avatar}
        alt="avatar"
        className={Styles["user_avatar"]}
      />
      <div className={Styles["user_text_info"]}>
        <p className={Styles["user_login"]}>ID: {_id}</p>
        <p className={Styles["user_login"]}>Логин: {name}</p>
        <p className={Styles["user_email"]}>Email: {surname}</p>
        <p className={Styles["user_login"]}>Логин: {login}</p>
        <p className={Styles["user_email"]}>Email: {email}</p>
      </div>
      <div className={Styles["user_btns"]}>
        <button className={Styles["user_block"]}>Временно заблокировать</button>
        <button className={Styles["user_block"]}>Заблокировать навсегда</button>
      </div>
    </div>
  );
};
