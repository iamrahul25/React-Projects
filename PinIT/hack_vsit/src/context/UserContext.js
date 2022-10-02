import {createContext, useEffect, useContext, useState } from "react";
import {db} from '../firebase/firebase_config';
import {collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';

import {useNavigate} from 'react-router-dom';

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({children}) => {

    const [showForm, setShowForm] = useState(true);
    const [showLocationPin, setShowLocationPin] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({lat: 22.9734, lng: 78.6569});
    const [zoomLevel, setZoomLevel] = useState(5);

    const [pinsList, setPinsList] = useState([]);

    const icons = {
        "broken-road": 'https://www.svgrepo.com/show/58309/road.svg',
        "faulty-traffic-light": 'https://www.svgrepo.com/show/184015/traffic-light.svg',
        "garbage-pile": 'https://www.svgrepo.com/show/40912/garbage.svg',
        "broken-water-pipe": 'https://www.svgrepo.com/show/57869/pipe.svg',
        "non-working-street-light": 'https://www.svgrepo.com/show/111357/street-light.svg',
        "others" : 'https://www.svgrepo.com/show/289489/red-flag.svg'
    }


    //Getting Current Location Function
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setShowLocationPin(true);
            setCurrentLocation({ lat: latitude, lng: longitude });
            setZoomLevel(16);
            console.log(" Your Current location is: ", { lat: latitude, lng: longitude });
        });
    };

    const updateCoordinates = (e) => {
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();

        //Round off to 7 decimal places
        lat = Math.round(lat * 10000000) / 10000000;
        lng = Math.round(lng * 10000000) / 10000000;
    
        const coordinates = {lat: lat, lng: lng};
        setCurrentLocation(coordinates);
        // console.log("Coordinates are: ",coordinates);
    }
    
    const [reloadPage, setReloadPage] = useState(0);
    const navigate = useNavigate();
    const [allBlogs, setAllBlogs] = useState([]);

    //Firebase
    const usersCollectionRef = collection(db,'all_pins');

    //FETCHING USER DATA FROM FIREBASE-------------------
    useEffect(()=>{

        const getAllPins = async() => {
          const data = await getDocs(usersCollectionRef);
          setPinsList(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };
    
        getAllPins();
    
    },[]);


    //SAVING USER DATA TO FIREBASE-----------------------
    const savePins = async(pin) => {

    console.log("Pin Details: ", pin);
    await addDoc(usersCollectionRef, pin);

    alert("🥳 Pin Added Successfully!");
    window.location.reload();

    };


    //Getting Single Blog by ID in Firebase---------------
    const getSingleBlog = async(id) => {
        const docRef = doc(db, "all_pins", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        // console.log("Single Blog: ", data);
        return data;
    }

    const value = {
        showForm,
        setShowForm,

        showLocationPin, setShowLocationPin,

        currentLocation, setCurrentLocation,

        getCurrentLocation,

        zoomLevel, setZoomLevel,

        updateCoordinates,

        pinsList, setPinsList,

        icons,


        savePins,
        allBlogs,
        getSingleBlog,
        reloadPage,
        setReloadPage,
    };

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>;
};