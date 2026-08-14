import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, SetQuery] = useState("");
  const navigate = useNavigate();

  const handler = (value) => {
    SetQuery(value);
    navigate(`/order/${query}`);
  };

  return (
    <form>
      <input type="text" value={query} onClick={(e) => handler(e.target.value)}>
        enter order id
      </input>
    </form>
  );
}
export default Search;
