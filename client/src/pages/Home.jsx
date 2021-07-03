import React, { useContext, useState, useEffect } from "react";
import { UidContext } from "../components/AppContext";
import L from 'leaflet';
import { Modal, Button } from 'react-bootstrap';

function Home () {

  useEffect(() => {
    console.log("mounted");
    var map = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

    var marker = L.marker([51.5, -0.09]).addTo(map);
    var marker2 = L.marker([51.56, -0.09]).addTo(map);
    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


    function onMapClick(e) {
      console.log(e)
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
      handleShowAdd();
      // alert("You clicked the map at " + e.latlng.lat + " : " + e.latlng.lng);
    }

    function onMarkerClick(e) {
      console.log(e)
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
      handleShowExist();
      // alert("You clicked the map at " + e.latlng.lat + " : " + e.latlng.lng);
    }

    map.on('click', onMapClick);
    marker.on('click', onMarkerClick);

    var cities = L.layerGroup([marker]);
    var autre = L.layerGroup([marker2]);

    var overlayMaps = {
        "Cities": cities,
        "Autre": autre
    };

    L.control.layers(overlayMaps).addTo(map);
  }, []);


  const [showAdd, setShowAdd] = useState(false);
  const [showExist, setShowExist] = useState(false);
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseExist = () => setShowExist(false);
  const handleShowExist= () => setShowExist(true);


  return (
    <>
      <div id='mapid' style={{ height: "calc(100vh - 4rem)" }}></div>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un lieu</Modal.Title>
        </Modal.Header>
        <Modal.Body>Lat : {lat}, Lng : {lng}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleCloseAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showExist} onHide={handleCloseExist}>
        <Modal.Header closeButton>
          <Modal.Title>Lieu existant</Modal.Title>
        </Modal.Header>
        <Modal.Body>Lat : {lat}, Lng : {lng}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExist}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleCloseExist}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
  
}

export default Home;
