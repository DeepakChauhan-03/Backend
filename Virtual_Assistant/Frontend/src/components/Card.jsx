import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext"; 

//Image card

const Card = ({ image }) => {
  const {selectedImage, setSelectedImage,  frontendImage,setFrontendImage,
        backendImage,setBackendImage} = useContext(userDataContext)

  return (
    <div
      onClick={() =>{
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)
      }
      }
      className={`w-18 h-35 lg:w-45 lg:h-70 bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden cursor-pointer
         transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500 hover:border-white ${
        selectedImage === image ? "border-white  shadow-2xl shadow-blue-500" : ""
      }`}
    >
      <img src={image} alt="image" className="w-full h-full object-cover" />
    </div>
  );
};

export default Card;
