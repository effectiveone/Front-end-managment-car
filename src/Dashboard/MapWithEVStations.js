import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Layout from "../shared/components/Layout";
import EVStationCard from "../shared/components/EVStationCard";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    gap: "50px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
  mapContainer: {
    height: "500px",
    width: "500px",
    gap: "50px",
  },

  evCardsContainer: {
    height: "500px",
    width: "400px",
    border: "1px solid black",
    boxShadow: "10px",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  evCard: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
}));

const MapWithEVStations = () => {
  const classes = useStyles();

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 52.237049,
    lng: 19.017532,
  });
  const [mapZoom, setMapZoom] = useState(6);
  const [EvChargeStations, setEvChargeStations] = useState([]);

  useEffect(() => {
    if (map) return;
    setMap(
      L.map("map", {
        center: mapCenter,
        zoom: mapZoom,
        layers: [
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      })
    );
  }, [map]);

  useEffect(() => {
    const fetchEVStations = async () => {
      const apiKey = "513afb79-b078-45e1-b119-b72b1c684af1";
      const apiUrl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=PL&maxresults=10&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setEvChargeStations(data);
      return data;
    };
    const addMarkersToMap = (stations) => {
      stations?.forEach((station) => {
        const marker = L.marker([
          station.AddressInfo.Latitude,
          station.AddressInfo.Longitude,
        ])?.addTo(map);
        marker?.bindPopup(
          `<b>${station.AddressInfo.Title}</b> <br> ${station.AddressInfo.AddressLine1} <br> ${station.AddressInfo.Town} <br> ${station.AddressInfo.Postcode}`
        );
      });
    };
    fetchEVStations()
      ?.then((stations) => {
        addMarkersToMap(stations);
        setEvChargeStations(stations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [map]);
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={4} spacing={12}>
          <div id="map" className={classes.mapContainer} />
        </Grid>
        <Grid md={2} />
        <Grid item xs={12} md={4}>
          <div className={classes.evCardsContainer}>
            {EvChargeStations?.map((dat, ind) => (
              <EVStationCard
                key={ind}
                title={dat.AddressInfo.Title}
                address={dat.AddressInfo.AddressLine1}
                access={dat.AddressInfo.AccessComments}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default MapWithEVStations;
