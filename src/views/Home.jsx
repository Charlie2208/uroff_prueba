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
    //const [inputFiltroUiverseValue, setInputFiltroUniverseValue] = useState("")
    const [selectedUniverse, setSelectedUniverse] = useState("")
    const [openDropDownUniverse, setOpenDropDownUniverse] = useState(false)
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

    const filtrar = (terminoBusqueda) =>{
        let resultadoBusqueda = allCharacters.filter((element)=>{
            if(element.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return element
            } else if(element.universe === terminoBusqueda){
                return element
            }
        });
        setCharacters(resultadoBusqueda)
    }

    const uniqUniverse = []
    const filtrados = allCharacters.filter(element=>{
        const isDuplicate = uniqUniverse.includes(element.universe);

        if(!isDuplicate) {
            uniqUniverse.push(element.universe)
            return true;
        }
        return false;
    })
    
    const changeStyleBtn = () => {
        setStyleBtnBuscar("btn-2")
    }

    return(
        <div className="text-white   mx-20">
            <div className="flex justify-between mt-24">
                
                <div className="relative">
                    <div className="block text-center">

                        <label htmlFor="buscador" className={`${styleBtnBuscar === 'btn-1' ? 'absolute top-1 left-14' : 'absolute top-1 left-52 transition-opacity'}`}>
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
                </div>
                
                <div onClick={()=> setOpenDropDownUniverse(!openDropDownUniverse)}>
                <div className={`${openDropDownUniverse === false ? 'w-9 h-9 rounded-full bg-white' : 'w-56 h-28 bg-white rounded-lg transition-all'}`} > 
                     <div className="bg-white rounded-full h-9 w-9 overflow-hidden flex justify-center">
                        <img className="py-1" src={filter} alt="Person Logo" />
                    </div>  
                       <ul className={`bg-white mt-2 text-black rounded-lg overflow-y-auto ${openDropDownUniverse ? 'max-h-60' : 'max-h-0'}`}>
                           <div className="flex items-center px-2 bg-white text-black">
                               Universo {selectedUniverse}
                           </div>
                           
                           {
                               filtrados.map((item, id)=>{
                                   return(
                                       <li 
                                       key={id}
                                       className="bg-[#E2E2E2] cursor-pointer pl-2"
                                       onClick={() => {
                                           if(item.universe !== selectedUniverse){
                                             setSelectedUniverse(item.universe)
                                             setOpenDropDownUniverse(false)
                                             filtrar(item.universe)
                                             
                                           }
                                       }}
                                       >
                                           Universo {item.universe}
                                       </li>
                                   )
                               })
                            }
                       </ul>
                  
                </div>

                </div>
                
                
                


                <div className="bg-image"></div>
                <div className="image-1"></div>
                <h1 className="titulo">Prueba del dragón</h1>
           
            </div>


            <div className="grid md:grid-cols-4 gap-10 mt-60">
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