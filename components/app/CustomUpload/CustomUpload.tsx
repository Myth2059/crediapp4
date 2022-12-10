import Style from "./CustomUpload.module.css";
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from "react";
import { message, Modal, Progress } from "antd";
import uploadImage, { uploadProps } from "../../../utils/UploadImage";

/**
 * 
 * @param resultado Es un parametro al cual se debe pasar un setState que retorna un string
 * @returns 
 */
export default function CustomUpload(props: customUploadProps) {
     const ref = useRef<HTMLInputElement>(null);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [progreso, setProgreso] = useState(0);
     const formRef = useRef<HTMLFormElement>(null);

     const handleChange = async () => {
          setIsModalOpen(true);
          const file = ref.current?.files?.[0];
          if (!file) {
               alert('Por favor selecciona un archivo.');
               return;
          }
          var datos: uploadProps = { image: file, load: setProgreso }
          try {
               const imageUrl = await uploadImage(datos);
               props.resultado(imageUrl);
               message.success('La imagen se ha subido correctamente');
               // alert(`La imagen se ha subido correctamente: ${imageUrl}`);
               if (formRef.current) formRef.current.reset();
               setIsModalOpen(false);

          } catch (error) {
               const err = error as Error | any;
               message.error(`Error al subir la imagen: ${err.message}`)
               if (formRef.current) formRef.current.reset();
               setIsModalOpen(false);
          }

     }
     const handleClose = () => {
          setIsModalOpen(false);

     }


     return (


          <div className="hover:text-emerald-green border border-dashed bg-gray-50 border-gray-300 w-[102px] rounded-sm cursor-pointer ease-in-out duration-200 h-[102px] relative flex hover:border-emerald-green justify-center items-center">
               <form ref={formRef} className="absolute w-full h-full"><input type={"file"} className={"cursor-pointer h-full w-full absolute z-10 text-transparent " + Style.Input} name="upload" ref={ref} onChange={handleChange} accept="image/*" /></form>
               <div className="w-full h-full flex justify-center items-center gap-1">
                    <PlusOutlined /> Cargar
               </div>
               <Modal title="Subiendo Imagen" open={isModalOpen} onCancel={handleClose} destroyOnClose={true} footer={null}>
                    <Progress percent={progreso} />

               </Modal>


          </div>


     )
}
interface customUploadProps {
     resultado: (x: string) => void;
}