import { useLoaderData, useNavigation } from "react-router-dom";
import { getMenu ,type Pizza} from "../../services/apiRestaurant";
import Menuitem from "./MenuItem";
import Loader from "../../ui/Loader";

function Menu() {
  const menu = useLoaderData() as Pizza[];
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <Menuitem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() : Promise<Pizza []> {
  const menu = await getMenu();
  return menu;
}

export default Menu;
