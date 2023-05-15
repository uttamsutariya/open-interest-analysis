import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

const Sidebar = ({ symbols, symbol, handleSymbolChange, TABLE_DATA }) => {
	return (
		<>
			<Grid item md={3}>
				<Box sx={{ px: "20px" }}>
					{/* Handle symbol change */}
					<FormControl size="small" sx={{ minWidth: 200, bgcolor: "grey.100" }}>
						<Select value={symbol} onChange={handleSymbolChange}>
							{symbols.map((symbol) => (
								<MenuItem key={symbol} value={symbol}>
									{symbol}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* display basic info */}
					<Box sx={{ mt: 3 }}>
						<Typography variant="h6" sx={{ mx: 1, fontWeight: "500" }}>
							Info
						</Typography>

						<TableContainer sx={{ my: 1, bgcolor: "grey.100" }} component={Paper}>
							<Table size="medium">
								<TableBody>
									{TABLE_DATA.map((data) => (
										<TableRow key={data.key}>
											<TableCell>
												<Typography variant="subtitle2">{data.key}</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="body2">{data.value}</Typography>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			</Grid>
		</>
	);
};

export default Sidebar;
