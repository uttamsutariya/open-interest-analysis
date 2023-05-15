import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TransitionModal from "./Modal";

const Header = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<TransitionModal open={open} handleClose={handleClose} />
			<Box>
				<AppBar sx={{ backgroundColor: "info.dark" }} position="static">
					<Box sx={{ padding: "0 10px" }}>
						<Toolbar>
							<Typography
								variant="h5"
								sx={{ mr: "auto", fontWeight: "bold", textDecoration: "underlined" }}
							>
								Oi Lytics
							</Typography>
							<Button
								onClick={() => (!open ? handleOpen() : handleClose())}
								variant="contained"
								sx={{ textTransform: "capitalize", bgcolor: "#f5f5f5", color: "#000" }}
								color="inherit"
							>
								Why Open Interest Analysis Is Necessary ?
							</Button>
						</Toolbar>
					</Box>
				</AppBar>
			</Box>
		</>
	);
};

export default Header;
