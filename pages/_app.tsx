import "../styles/globals.css";
import "../styles/antd.less";
import "swiper/css/bundle";
import 'leaflet/dist/leaflet.css';
import "../styles/iconFonts/themify-icons.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
     return <Component {...pageProps} />;
}

export default MyApp;
