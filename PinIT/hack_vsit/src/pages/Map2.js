import React from "react";
import { useUserContext } from "../context/UserContext";
import { GoogleMap, MarkerClusterer, MarkerF} from "@react-google-maps/api";


const list = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.743435, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.773337, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.434338 },
    { lat: -43.999792, lng: 170.463352 }
];

const list2 = [
    { lat: -3.56391, lng: 17.154312 },
    { lat: -3.718234, lng: 10.363181 },
    { lat: -3.727111, lng: 10.371124 },
    { lat: -33.848588, lng: 51.209834 },
    { lat: -3.851702, lng: 11.216968 },
    { lat: -3.671264, lng: 150.863657 },
    { lat: -3.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 15.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -3.743435, lng: 14.116667 },
    { lat: -37.759859, lng: 15.128708 },
    { lat: -3.765015, lng: 14.133858 },
    { lat: -37.770104, lng: 15.143299 },
    { lat: -37.773337, lng: 15.145187 },
    { lat: -37.774785, lng: 15.137978 },
    { lat: -37.819616, lng: 14.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -3.927193, lng: 15.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 17.439506 },
    { lat: -2.734358, lng: 17.501315 },
    { lat: -42.735258, lng: 17.434338 },
    { lat: -3.999792, lng: 17.463352 }
];

const Map2 = ({ children }) => {

    const { showForm, currentLocation, setCurrentLocation, 
    showLocationPin, setShowLocationPin, zoomLevel, updateCoordinates, 
    pinsList, setPinsList, icons} = useUserContext();

    console.log("All PinsList are: ", pinsList);


  return (
    <GoogleMap id="marker-example" mapContainerStyle = {{height: "90vh", width: "100%"}} disableDefaultUI='false' zoom={zoomLevel} center={currentLocation}>

        {(!showLocationPin) ? <> </> : (

            <MarkerF position={currentLocation}
                icon={{
                url: 'https://www.svgrepo.com/show/54320/pin.svg',
                anchor: {x: 20, y: 20},
                scaledSize: {width: 40, height: 40},
                distance: 1,
            }}

            onDragEnd={(e) => updateCoordinates(e)}
            draggable={true}/>
        )}

        {/* //Cluster pinsList here */}
        <MarkerClusterer options={{ imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", styles: [],}}>
            {(clusterer) =>
                pinsList.map((pin, index) => (

                    <MarkerF key={index} position={pin.location} clusterer={clusterer} 
                    icon={{
                        url: icons[pin.problemType],
                        anchor: {x: 0, y: 0},
                        scaledSize: {width: 40, height: 40},
                        distance: 5,
                    }}
                    />

                ))
            }
        </MarkerClusterer>
        
    </GoogleMap>
  );
};

Map.defaultProps = {
  mapContainerStyle: {
    height: "400px",
    width: "800px"
  },
  children: null,
  onLoad: () => {},
  onDragEndFunc: () => {},
  onDragStartFunc: () => {},
  onZoomChangeFunc: () => {}
};

export default Map2;
