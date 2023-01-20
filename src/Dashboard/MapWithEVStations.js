import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Layout from "../shared/components/Layout";
import EVStationCard from "../shared/components/EVStationCard";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";

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
    width: "700px",
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
    lng: 21.017532,
  });
  const [mapZoom, setMapZoom] = useState(6);
  const [EvChargeStations, setEvChargeStations] = useState([]);
  const mapRef = useRef(null);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
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
      }),
      () => {
        const fetchEVStations = async () => {
          const apiKey = "513afb79-b078-45e1-b119-b72b1c684af1";
          const apiUrl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=PL&maxresults=50&key=${apiKey}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log("data", data);
          return data;
        };
        const addMarkersToMap = (stations) => {
          stations.forEach((station) => {
            const marker = L.marker([
              station.AddressInfo.Latitude,
              station.AddressInfo.Longitude,
            ]).addTo(map);
            marker.bindPopup(
              `<b>${station.AddressInfo.Title}</b> <br> ${station.AddressInfo.AddressLine1} <br> ${station.AddressInfo.Town} <br> ${station.AddressInfo.Postcode}`
            );
          });
        };
        fetchEVStations()
          .then((stations) => {
            addMarkersToMap(stations);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }, []);

  useEffect(() => {
    const fetchEVStations = async () => {
      const apiKey = "513afb79-b078-45e1-b119-b72b1c684af1";
      const apiUrl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=PL&maxresults=10&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setEvChargeStations(data);
      console.log("data", data);
      return data;
    };
    const addMarkersToMap = (stations) => {
      stations.forEach((station) => {
        const marker = L.marker([
          station.AddressInfo.Latitude,
          station.AddressInfo.Longitude,
        ]).addTo(map);
        marker.bindPopup(
          `<b>${station.AddressInfo.Title}</b> <br> ${station.AddressInfo.AddressLine1} <br> ${station.AddressInfo.Town} <br> ${station.AddressInfo.Postcode}`
        );
      });
    };
    fetchEVStations()
      .then((stations) => {
        addMarkersToMap(stations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [map]);

  useEffect(() => {
    const filteredData = EvChargeStations?.filter(
      (p) =>
        p.AddressInfo.title &&
        p.AddressInfo.AddressLine1 &&
        p.AddressInfo.AccessComments
    );
    return filteredData.map((dat, ind) => (
      <EVStationCard
        key={ind}
        title={dat.AddressInfo.Title}
        address={dat.AddressInfo.AddressLine1}
        access={dat.AddressInfo.AccessComments}
      />
    ));
  }, [EvChargeStations]);

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
        <div>
          <div id="map" className={classes.mapContainer} />
        </div>
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
      </div>
    </Layout>
  );
};

export default MapWithEVStations;
