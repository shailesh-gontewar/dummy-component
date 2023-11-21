import { Typography, Box } from "@mui/material";
// import { tokens } from "../theme";
import { grey } from "@mui/material/colors";
const Header = ({ title, subtitle }) => {
 
  return (
    <Box mb="30px">
      <Typography
      color={grey[700]}
        variant="h5"
        fontWeight="bold"
        sx={{ m: "0" ,textAlign:'center'}}
      >
        {title}
      </Typography>
      <Typography variant="h5">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
