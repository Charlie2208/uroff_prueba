import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import logoDragonball from "../assets/images/logoDragonball.png"
import InfoDetalle from "../components/InfoDetalle";

import './detalle.css'


const Detalle = () => {
    const { name } = useParams()

    const [character, setCharacter] = useState([])

        useEffect(()=> {
            axios.get(`https://dragon-ball-super-api.herokuapp.com/api/characters/${name}`)
            .then((res) => {
            const datos = res.data
            setCharacter(datos)
            })
        },[])

    return(
        <div className="mx-20 h-screen">

            
            <div className="flex justify-center">
                <img src={logoDragonball} className="" alt="" />
            </div>
           

            <div className="grid grid-cols-2">
                <div>
                    <img className="img-detalle" src={character.imageUrl} alt="" />
                </div>
                <div>
                    <h2 className="font-bold text-6xl text-white mb-8">{character.name}</h2>
                    <span className="universe">Universe {character.universe}</span>

                    <div className="">
                    
                        <InfoDetalle titulo="Specie" dato={character.specie} />
                        <InfoDetalle titulo="Role"dato={character.role} />
                        <InfoDetalle titulo="Status" dato={character.status} />
                        <InfoDetalle titulo="Originplanet" dato={character.originplanet} />
                        <InfoDetalle titulo="Transform" dato={character.transform} />
                    </div>
                </div>
            
          
            </div>

            
        </div>
    )
}

export default Detalle