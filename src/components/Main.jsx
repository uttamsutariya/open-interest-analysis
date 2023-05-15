import { Box, Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useOiContext } from "../hooks/useOiContext";
import Sidebar from "./Sidebar";
import ChartView from "./ChartView";
import TableView from "./TableView";

const Main = () => {
	// from context
	const { symbols, recordItem, handleRecordItem, isLoading, isError } = useOiContext();

	// switch state
	const [showOiChange, setShowOiChange] = useState(true);
	const [showOi, setShowOi] = useState(true);

	// symbol state
	const [symbol, setSymbol] = useState(symbols[0] || "");

	// datewise oi data
	const dateWiseOi = [];

	// render when symbols settled
	useEffect(() => {
		setSymbol(symbols[0]);
		handleRecordItem(symbols[0]);
	}, [symbols]);

	// manipulated data for chart
	for (let obj in recordItem?.data) {
		dateWiseOi.push({
			date: obj,
			oi: recordItem?.data[obj]?.OI,
			oi_change: recordItem?.data[obj]?.OIChange,
		});
	}

	// getting info from record of a particular symbol
	const TABLE_DATA = [
		{
			key: "Underlying",
			value: recordItem?.underlying,
		},
		{
			key: "Expiry",
			value: recordItem?.expiry,
		},
		{
			key: "Strike",
			value: recordItem?.strike,
		},
		{
			key: "Type",
			value: recordItem?.type,
		},
	];

	// find record according to symbol change
	const handleSymbolChange = (e) => {
		const val = e.target.value;
		handleRecordItem(val);
		setSymbol(val);
	};

	if (isLoading) return <p>Loading ...</p>;
	if (isError) return <p>Something went wrong</p>;

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", my: "20px", p: "0 10px" }}>
				<Grid container spacing={2}>
					{/* sidebar (info) */}
					<Sidebar
						handleSymbolChange={handleSymbolChange}
						TABLE_DATA={TABLE_DATA}
						symbols={symbols}
						symbol={symbol}
					/>

					{/* chart & switches */}
					<ChartView
						setShowOiChange={setShowOiChange}
						setShowOi={setShowOi}
						showOiChange={showOiChange}
						showOi={showOi}
						dateWiseOi={dateWiseOi}
					/>
				</Grid>
				<Box sx={{ px: "20px", mt: 5 }}>
					<Box sx={{ my: 2 }}>
						<Typography sx={{ fontWeight: "bold" }} variant="h5">
							The last day's OI data & it's change
						</Typography>
					</Box>
					<Box>
						<Paper sx={{ width: "80%" }}>
							<TableView />
						</Paper>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Main;
