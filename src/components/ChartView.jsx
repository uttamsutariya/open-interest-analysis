import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Box, Grid, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartView = ({ setShowOi, setShowOiChange, showOi, showOiChange, dateWiseOi }) => {
	return (
		<>
			<Grid item md={9}>
				<Paper sx={{ bgcolor: "grey.100" }} elevation={3}>
					<Box
						sx={{
							height: "500px",
							p: 5,
							display: "flex",
							flexDirection: "column",
							alignItems: "end",
						}}
					>
						{/* switches */}
						<FormGroup sx={{ display: "inline-block", my: 1 }}>
							<FormControlLabel
								control={
									<Switch
										onChange={() => setShowOi((prev) => !prev)}
										checked={showOi}
										disabled={showOi && !showOiChange}
									/>
								}
								label="Actual OI"
							/>
							<FormControlLabel
								control={
									<Switch
										onChange={() => setShowOiChange((prev) => !prev)}
										checked={showOiChange}
										disabled={!showOi && showOiChange}
									/>
								}
								label="OI Change"
							/>
						</FormGroup>

						{/* bar chart */}
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={dateWiseOi}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="1 1" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="oi" fill="#01579b" hide={!showOi} />
								<Bar dataKey="oi_change" fill="#388e3c" hide={!showOiChange} />
							</BarChart>
						</ResponsiveContainer>
					</Box>
				</Paper>
			</Grid>
		</>
	);
};

export default ChartView;
