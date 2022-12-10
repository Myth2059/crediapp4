// import axios from 'axios';

// const IMGBB_URL = 'https://api.imgbb.com/1/upload';
// const IMGBB_API_KEY = '07ecdd8d67c58da83f21e32ad2bb12fc';

// async function uploadImage(image: File): Promise<string> {
//      const formData = new FormData();
//      formData.append('image', image);

//      const response = await axios.post(
//           IMGBB_URL,
//           formData,
//           {
//                params: {
//                     key: IMGBB_API_KEY,
//                },
//           },
//      );

//      return response.data.data.url;
// }
import axios from 'axios';

// Reemplaza "your_api_key" con tu clave de API de imgBB
const IMGBB_API_KEY = '07ecdd8d67c58da83f21e32ad2bb12fc';

// Declara la función `uploadImage()` que toma un objeto `File` que representa la imagen
// a subir y devuelve una promesa con la URL de la imagen una vez que se ha subido correctamente
async function uploadImage(props: uploadProps): Promise<string> {
     // Crea un nuevo objeto `FormData` y agrega la imagen al objeto
     const formData = new FormData();
     formData.append('image', props.image);

     // Crea una variable para almacenar el porcentaje de carga actual
     let progress = 0;

     // Utiliza axios para enviar una solicitud POST a la API de imgBB junto con la imagen en
     // el cuerpo de la solicitud. También establece la clave de API en los parámetros de la
     // solicitud y establece el tipo de contenido en `multipart/form-data`
     const response = await axios.post(
          'https://api.imgbb.com/1/upload',
          formData,
          {
               params: {
                    key: IMGBB_API_KEY,
               },
               onUploadProgress: (event) => {
                    // Calcula el porcentaje de carga actual utilizando la propiedad `loaded` y `total`
                    // del objeto `ProgressEvent` y setea el porcentaje en el setState que se pase a traves de las props
                    if (event.total != undefined) {
                         props.load(Math.round((event.loaded * 100) / event.total));
                         // props.load(50);
                    }

               },
          },
     );

     // Devuelve la URL de la imagen subida a imgBB
     return response.data.data.url;
}
export interface uploadProps {
     image: File;
     /**
      * En load debe ir el set de un useState
      */
     load: (x: number) => void;
}
export default uploadImage;