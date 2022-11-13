import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import L from "leaflet";
import marker from "../../public/marker.png";
import Link from 'next/link';

const icon = new L.Icon({ iconUrl: marker.src, iconRetinaUrl: marker.src, popupAnchor: [-0, -20], iconSize: [32, 45] });
export default function CustomMap(props: customMapProps) {

     return (
          <MapContainer center={props.position} zoom={16} style={{ height: "100%" }}>
               <TileLayer
                    attribution=''
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker icon={icon} position={props.position} >

                    <Popup><Link href={`https://www.google.com.ar/maps/place/${props.position.lat},+${props.position.lng}/@${props.position.lat},+${props.position.lng}`}><a>Google Maps</a></Link></Popup>


               </Marker>
          </MapContainer>
     )
}
export interface customMapProps {
     position: { lat: number, lng: number };

}