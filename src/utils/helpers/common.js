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
  return typeof window !== "undefined" ? window.location.href : "";
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

/* Helper function */
export function download_file(fileURL, fileName) {
  // for non-IE
  if (!window.ActiveXObject) {
    var save = document.createElement("a");
    save.href = fileURL;
    save.target = "_blank";
    var filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
    save.download = fileName || filename;
    if (
      navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
      navigator.userAgent.search("Chrome") < 0
    ) {
      document.location = save.href;
      // window event not working here
    } else {
      var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      save.dispatchEvent(evt);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
  }

  // for IE < 11
  else if (!!window.ActiveXObject && document.execCommand) {
    var _window = window.open(fileURL, "_blank");
    _window.document.close();
    _window.document.execCommand("SaveAs", true, fileName || fileURL);
    _window.close();
  }
}
