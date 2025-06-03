import { usePopupContext } from "../contexts/PopupContext";

export default function usePopup() {
  const { openPopup, closePopup } = usePopupContext();
  return { openPopup, closePopup };
}
