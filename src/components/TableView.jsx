import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useOiContext } from "../hooks/useOiContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const TableView = () => {
	let { tableData } = useOiContext();

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Symbol</StyledTableCell>
						<StyledTableCell align="left">strike</StyledTableCell>
						<StyledTableCell align="left">Last Date</StyledTableCell>
						<StyledTableCell align="left">Oi</StyledTableCell>
						<StyledTableCell align="left">Oi Change</StyledTableCell>
						<StyledTableCell align="left">Expiry</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map((row) => (
						<StyledTableRow key={row.symbol}>
							<StyledTableCell align="left">{row.symbol}</StyledTableCell>
							<StyledTableCell align="left">{row.strike}</StyledTableCell>
							<StyledTableCell align="left">{row.last_date}</StyledTableCell>
							<StyledTableCell align="left">{row.oi}</StyledTableCell>
							<StyledTableCell align="left">{row.oi_change}</StyledTableCell>
							<StyledTableCell align="left">{row.expiry}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableView;
