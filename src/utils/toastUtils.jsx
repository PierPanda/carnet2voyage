import { toast } from "react-toastify";
import { InfoToast } from "../components/InfoToast";

export function showInfoToast(message) {
  toast(
    ({ closeToast }) => <InfoToast message={message} closeToast={closeToast} />,
    {
      closeButton: false,
    }
  );
}
