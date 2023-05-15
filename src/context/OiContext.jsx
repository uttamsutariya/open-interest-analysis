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
	const [tableData, setTableData] = useState([]);

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

			// get tabular data to show
			const tabularData = getTabularData(data?.record);
			setTableData(tabularData);
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [API_URL]);

	// get all symbols
	const getAllSymbols = (records) => sortSymbolsStrikeWise(records.map((record) => record.symbol));

	// sort symbols strike wise
	const sortSymbolsStrikeWise = (records) => {
		return records.sort((a, b) => {
			const strike_a = parseInt(a.split(" ")[3]);
			const strike_b = parseInt(b.split(" ")[3]);

			return strike_a > strike_b ? 1 : -1;
		});
	};

	// get tabular data (strike wise sorted)
	const getTabularData = (records) =>
		records
			.map((record) => ({
				symbol: record.symbol,
				strike: record.strike,
				expiry: record.expiry,
				expiryType: record.expiryType,
				type: record.type,
				last_date: Object.keys(record.data)[Object.keys(record.data).length - 1],
				oi: record.data[Object.keys(record.data)[Object.keys(record.data).length - 1]].OI,
				oi_change: record.data[Object.keys(record.data)[Object.keys(record.data).length - 1]].OIChange,
			}))
			.sort((a, b) => {
				const strike_a = parseInt(a.symbol.split(" ")[3]);
				const strike_b = parseInt(b.symbol.split(" ")[3]);
				return strike_a > strike_b ? 1 : -1;
			});

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
				tableData,
				handleRecordItem,
			}}
		>
			{children}
		</OiContext.Provider>
	);
};

export default OiContextProvider;
