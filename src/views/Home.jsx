import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Card from "../components/Card"
import axios from "axios"
import search from "../assets/images/search.png"
import filter from "../assets/images/filter.png"


import './home.css'

//import reactLogo from './assets/react.svg'
const Home = () => {

    const [characters, setCharacters] = useState([])
    const [allCharacters, setAllCharacters] = useState([])
    const [buscador, setBuscador ] = useState("")
    const [styleBtnBuscar, setStyleBtnBuscar] = useState('btn-1')

    useEffect(()=> {
        axios.get('https://dragon-ball-super-api.herokuapp.com/api/characters')
        .then((res) => {
        const datos = res.data
        setCharacters(datos)
        setAllCharacters(datos)
        })
    },[])

    const handleChange = (e) =>{
        setBuscador(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar =(terminoBusqueda) =>{
        let resultadoBusqueda = allCharacters.filter((el)=>{
            if(el.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return el
            }
        });
        setCharacters(resultadoBusqueda)
    }

    const changeStyleBtn = () => {
        setStyleBtnBuscar("btn-2")
    }

    return(
        <div className="text-white   mx-20">
            <div className="flex justify-between mt-24">
                
                <div className="relative">
                    <label htmlFor="buscador" className="absolute top-1 left-1 ">
                        <img className="w-7" src={search}></img>
                    </label>
                    <input type="text"
                    value={buscador}
                    placeholder={buscador}
                    onChange={handleChange}
                    onClick={changeStyleBtn}
                    className={`${styleBtnBuscar}`}
                    id="buscador"
                    />
                    <span className="flex flex-row">Buscar por nombre</span>
                </div>

                <div>
                    <span className="bg-white rounded-full h-9 w-9 flex justify-center">
                        <img className="py-1" src={filter} alt="Person Logo" />
                    </span>
                </div>
                
                


                <div className="bg-image"></div>
                <div className="image-1"></div>
                <h1 className="titulo">Prueba del dragón</h1>
           
                
            </div>

            <div className="grid md:grid-cols-4 gap-10 mt-80">
                {
                    characters.map((item, id)=>{
                        return(
                            <div key={id}>
                                <Card 
                                name={item.name}
                                universe={`universe ${item.universe}`}
                                img={item.imageUrl}
                                />
                                <Link to={`/${item.name}`}>
                                    <button type="button" 
                                    className="btn-ficha text-transparent  hover:visible hover:text-[#1E1E1E] hover:bg-white rounded-xl w-32 
                                    text-center ml-9">
                                        Ver Ficha
                                    </button>
                                </Link>
                                
                            </div>
                        )
                    })
                }  
            </div>
        </div>
    )
}

export default Home