import { useEffect, useRef, useState } from "react";
import { TileLayer, Marker, MapContainer, useMapEvents, Popup } from 'react-leaflet';
import marker from "../../public/marker.png";
import React from "react";
import L from "leaflet";
import Link from "next/link";
import { Alert, message } from "antd";



const icon = new L.Icon({ iconUrl: marker.src, iconRetinaUrl: marker.src, popupAnchor: [-0, -20], iconSize: [32, 45] });
export default function Prueba(props: customMapProps) {

     const [position, setPosition] = useState(props.coords == undefined ? [-12, -69] : props.coords);
     const [map, setMap] = useState(null);
     const ref = useRef<L.Map>(null);

     const getLocation = () => {



          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
               if (result.state === 'granted') {
                    if (navigator.geolocation) {
                         navigator.geolocation.getCurrentPosition(showPosition);

                    } else {
                         console.log("geolocation is not supported by this browser")
                         // geolocation is not supported by this browser
                    }


               } else if (result.state === 'denied') {
                    message.error("Sin acceso al Gps")

               }
          })






     };
     const showPosition = (position: any) => {
          ref.current?.flyTo([position.coords.latitude, position.coords.longitude], 16);
          setPosition([position.coords.latitude, position.coords.longitude]);
     };


     const Markers = () => {

          const map = useMapEvents({
               click(e) {
                    setPosition([
                         e.latlng.lat,
                         e.latlng.lng
                    ]);
               },
          })

          return (
               position ?
                    <Marker
                         key={position[0]}
                         position={{ lat: position[0], lng: position[1] }}

                         icon={icon}
                    >
                         <Popup><div><Link href={""}><a>Google</a></Link> <span onClick={() => console.log(position)}>Guardar</span></div></Popup>
                    </Marker>
                    : null
          )

     }

     useEffect(() => {
          if (props.coords == undefined) {
               getLocation();
          }

     }, []);

     return (



          <MapContainer center={{ lat: position[0], lng: position[1] }} zoom={props.coords != undefined ? 16 : 3} style={{ height: "100%" }} ref={ref} >
               <Markers />
               <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               />
               {/* <Marker position={{lat:position[0],lng:position[1]}} icon={icon} /> */}
               <button
                    className="leaflet-control-locate"
                    onClick={getLocation}
                    style={{
                         backgroundColor: '#fff',
                         border: '2px solid #fff',
                         boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                         boxSizing: 'border-box',
                         cursor: 'pointer',
                         height: '36px',
                         margin: '10px',
                         padding: '0 10px',
                         position: 'absolute',
                         right: '10px',
                         top: '10px',
                         userSelect: 'none',
                         zIndex: '1000',
                    }}
               >
                    Locate
               </button>
          </MapContainer>
     )
}
interface customMapProps {
     /**
      * primero va latitud y luego longitud [5,10]
      */
     coords: number[] | undefined;
}






















































// import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
// import L from "leaflet";
// import marker from "../../public/marker.png";
// import Link from 'next/link';

// import { useEffect, useState } from 'react';



// const icon = new L.Icon({ iconUrl: marker.src, iconRetinaUrl: marker.src, popupAnchor: [-0, -20], iconSize: [32, 45] });
// export default function CustomMap(props: customMapProps) {

//      return (
//           <MapContainer center={props.position} zoom={16} style={{ height: "100%" }} >
//                <TileLayer
//                     attribution=''
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                />
//                <Marker icon={icon} position={props.position} >

//                     <Popup><Link href={`https://www.google.com.ar/maps/place/${props.position.lat},+${props.position.lng}/@${props.position.lat},+${props.position.lng}`}><a>Google Maps</a></Link></Popup>


//                </Marker>
//           </MapContainer>
//      )
// }
// export interface customMapProps {
//      position: { lat: number, lng: number };

// }