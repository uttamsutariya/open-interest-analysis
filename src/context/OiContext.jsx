import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

export const OiContext = createContext();

const API_URL = "https://api.jsonbin.io/v3/b/6280966238be296761059394";

const OiContextProvider = ({ children }) => {
	// state handlers
	const [records, setRecords] = useState([]);
	const [symbols, setSymbols] = useState([]);
	const [recordItem, setRecordItem] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleRecordItem = (symbol) => {
		const record = records.find((record) => record.symbol === symbol);
		setRecordItem(record);
	};

	// fetch oi data
	const fetchOiData = useCallback(async () => {
		try {
			setIsLoading(true);

			// get data from API
			const { data } = await axios.get(API_URL);

			// set all records
			setRecords(data?.record);

			// extract all symbols & set
			const symbols = getAllSymbols(data?.record);
			setSymbols(symbols);
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [API_URL]);

	// get all symbols
	const getAllSymbols = (records) => {
		return records.map((record) => record.symbol);
	};

	// fetch when page renders
	useEffect(() => {
		fetchOiData();
	}, []);

	useEffect(() => {
		setIsLoading(false);
	}, [symbols, records]);

	return (
		<OiContext.Provider
			value={{
				isLoading,
				isError,
				symbols,
				recordItem,
				handleRecordItem,
			}}
		>
			{children}
		</OiContext.Provider>
	);
};

export default OiContextProvider;
