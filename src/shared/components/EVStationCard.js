import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: "300px",
    overflow: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function EVStationCard(props) {
  const classes = useStyles();
  const { title, address, comments } = props;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          EV Charging Station
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {address}
        </Typography>
        <Typography variant="body2" component="p">
          {comments}
        </Typography>
      </CardContent>
    </Card>
  );
}
