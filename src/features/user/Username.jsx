import { useSelector } from "react-redux";
import { getUserName } from "./UserSlice";

function Username() {
  const { username } = useSelector(getUserName);

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
