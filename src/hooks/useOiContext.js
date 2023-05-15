import { useContext } from "react";
import { OiContext } from "../context/OiContext";

export const useOiContext = () => {
	return useContext(OiContext);
};
