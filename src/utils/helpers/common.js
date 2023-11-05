import { faGraduationCap } from "@fortawesome/free-solid-svg-icons/faGraduationCap";
import { faBuilding } from "@fortawesome/free-solid-svg-icons/faBuilding";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faSquareH } from "@fortawesome/free-solid-svg-icons/faSquareH";
import { faPaw } from "@fortawesome/free-solid-svg-icons/faPaw";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons/faBagShopping";
import { faGasPump } from "@fortawesome/free-solid-svg-icons/faGasPump";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";

export const getFontAwesomeSvgPath = (icon) => {
  switch (icon) {
    case "school":
      return faGraduationCap.icon[4];
    case "gym":
      return faBuilding.icon[4];
    case "supermarket":
      return faCartShopping.icon[4];
    case "hospital":
      return faSquareH.icon[4];
    case "pet":
      return faPaw.icon[4];
    case "mall":
      return faBagShopping.icon[4];
    case "gas_station":
      return faGasPump.icon[4];
    case "restaurant":
      return faUtensils.icon[4];

    default:
      return null;
  }
};
