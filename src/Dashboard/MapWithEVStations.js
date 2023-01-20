import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Layout from "../shared/components/Layout";

const MapWithEVStations = () => {
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 52.237049,
    lng: 21.017532,
  });
  const [mapZoom, setMapZoom] = useState(6);
  const mapRef = useRef(null);

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
          const apiUrl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=PL&maxresults=10&key=${apiKey}`;
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

  return (
    <Layout>
      <div>
        <div id="map" style={{ height: "500px", width: "700px" }} />
      </div>
    </Layout>
  );
};

export default MapWithEVStations;
