import { useContext } from "react";
import SocketContext from "../contexts/SocketContext";

export default function () {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocket must be used inside an SocketProvider");
  }

  return ctx;
}
