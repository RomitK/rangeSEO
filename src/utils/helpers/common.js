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
      return faGraduationCap;
    case "gym":
      return faBuilding;
    case "supermarket":
      return faCartShopping;
    case "hospital":
      return faSquareH;
    case "pet":
      return faPaw;
    case "mall":
      return faBagShopping;
    case "gas_station":
      return faGasPump;
    case "restaurant":
      return faUtensils;

    default:
      return null;
  }
};

export const getCurrentUrl = () => {
  return window.location.href;
};

export function fetchResponseErrors(response) {
  let msgs = [];
  if (response?.status == 422) {
    let errors = response.data.errors;
    let _errors = Object.keys(errors);
    for (let i = 0; i < _errors.length; i++) {
      msgs.push(errors[_errors[i]][0]);
    }

    return msgs;
  } else {
    msgs.push(response?.data?.message);
    return msgs;
  }
}
