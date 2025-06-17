import { UserCard } from "../UserCard/UserCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllUsers, selectAllUsers } from "../../features/auth/auth";

import Styles from "./UserList.module.css";

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (!users.length) {
    return <div>Нет пользователей для отображения.</div>;
  }
  return (
    <div className={Styles["user_items"]}>
      {users.map((user) => (
        <UserCard key={user._id} {...user} />
      ))}
    </div>
  );
};
