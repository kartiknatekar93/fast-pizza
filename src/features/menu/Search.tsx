import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, SetQuery] = useState("");
  const navigate = useNavigate();

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    SetQuery(e.target.value);
    navigate(`/order/${query}`);
  };

  return (
    <form>
      <input type="text" value={query} onChange={handler}>
        enter order id
      </input>
    </form>
  );
}
export default Search;
