import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const style = {
	position: "absolute",
	top: "10%",
	right: "3%",
	width: 700,
	bgcolor: "grey.100",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const TransitionModal = ({ open, handleClose }) => {
	return (
		<div>
			<Modal
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="modal-title" variant="h6" component="h2">
							What is open interest and how it can be useful ?
						</Typography>
						<hr />
						<Typography id="modal-description" sx={{ mt: 2 }}>
							It is the total number of outstanding derivative contracts, such as options or futures that
							have not been settled for an asset. Open interest keeps track of every open position in a
							particular contract, rather than tracking the total volume traded in it, which may also
							included netting or closing positions.
						</Typography>
						<Typography id="modal-description" sx={{ mt: 2 }}>
							Thus, open interest can provide a more accurate picture of a contract's liquidity and
							interest, identifying whether money flows into the contract are increasing or decreasing.
						</Typography>
						<Button onClick={handleClose} variant="contained" sx={{ mt: 2, bgcolor: "info.dark" }}>
							Close
						</Button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default TransitionModal;
