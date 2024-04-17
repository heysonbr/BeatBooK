import React from "react"; // Importa useContext de 'react'
import "../../styles/home.css";
import { Carousel } from "../component/home/carousel";
import { CardPlaces } from "../component/home/cardPlaces";
import { Cards } from "../component/home/cardBands";


export const Home = () => {
  
    return (
        <div className="container">
            <div className="container text-center">
                    <h1 className="display-2 fw-bold pt-5">Descubre nuestros eventos</h1>
                <h6 className="mb-5">Elije el mejor</h6>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col">
                            <Carousel />
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="locales text-start my-5"> Locales</h1>
                <div className="row justify-content-center">
					<CardPlaces/>
                    
                </div>
                <h1 className="locales text-start my-5">Bandas</h1>
                <div className="row justify-content-center">
                    <Cards />
                </div>
            </div>
        </div>
    );
};

