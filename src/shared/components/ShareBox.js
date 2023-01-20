import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@mui/icons-material/Money";

const ShareBox = (props) => {
  // const {TotalSum, ArrayOfMonths} = props;

  // const calc = (props) => {
  // const len = props.length
  // const value = (100 - (props[len-1] / props[len-2])*100)

  // const Arrow = (props[len] > props[len-1] ?
  // <ArrowUpwardIcon color="success"/> :
  // <ArrowDownwardIcon color="error" />)
  // return(<>
  // <div style={{display: "flex", flexDirection: "row",  alignItems: "center", justifyContent: "center"}}>
  // {Arrow} {value.toFixed(1)}%</div>
  // </>
  // )
  // }
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL SELL
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {/* $ {(TotalSum/1000).toFixed(1)}k */}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            color="error"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {/* {calc(ArrayOfMonths)} */}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShareBox;
