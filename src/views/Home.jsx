import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Card from "../components/Card"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faFilter} from "@fortawesome/free-solid-svg-icons"
import './home.css'
import 'animate.css';


const Home = () => {

    const [characters, setCharacters] = useState([])
    const [allCharacters, setAllCharacters] = useState([])
    const [buscador, setBuscador ] = useState("")
    const [selectedUniverse, setSelectedUniverse] = useState("")
    const [openDropDownUniverse, setOpenDropDownUniverse] = useState(false)
    const [open, setOpen] = useState(false)
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

    const ordenMayorMenor = filtrados
    ordenMayorMenor.sort(((a, b) => b.universe - a.universe))
    ordenMayorMenor.reverse(((a, b) => b.universe - a.universe))
    
    const changeStyleBtn = () => {
        setStyleBtnBuscar("btn-2")
    }

    return(
        <div className={`${characters.length <= 4 ? 'h-screen text-white   mx-20' : 'text-white   mx-20'} `}>
            <div className="flex justify-between mt-24 ">
                <div className="relative">
                    <div className="block text-center">
        
                        <label htmlFor="buscador" className={`${styleBtnBuscar === 'btn-1' ? 'absolute top-1 left-14 text-slate-700' : 'absolute top-1 left-52  ease-in duration-700 text-red-600'}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-7" />
                        </label>
                        <input type="text"
                        value={buscador}
                        placeholder={buscador}
                        onChange={handleChange}
                        onClick={changeStyleBtn}
                        className={`${styleBtnBuscar} pl-3`}
                        id="buscador"
                        />
                        <span className="flex flex-row">Buscar por nombre</span>
                    </div>
                </div>
                
                <div 
                    onMouseEnter={() => setOpenDropDownUniverse(!openDropDownUniverse)}
                    onMouseLeave={() => setOpenDropDownUniverse(false)}
                    onClick={()=> setOpen(!open)}
                >
                    <div className={`${openDropDownUniverse === false ? 'w-9 h-9 rounded-full bg-white' : 'w-56 h-9 bg-white rounded-lg animate__animated animate__slideInLeft'}`} > 
                        <div className={`${openDropDownUniverse === false ? 'bg-white rounded-full h-9 w-9 overflow-hidden flex justify-center' : 'bg-white rounded-full h-9 w-9 overflow-hidden flex justify-center absolute right-2' }`}>
                            <FontAwesomeIcon icon={faFilter} className="py-1 w-6 h-6 text-black" />
                        </div> 
                            <div className="">
                                    <div>
                                        <p className={`${openDropDownUniverse === false ?'absolute right-11' : 'absolute right-11 top-11'} ${open ? 'hidden' : 'visible'}`}>Filtrar  universos</p> 
                                    </div>
                                
                                <ul className={`bg-white mt-2 text-black rounded-lg overflow-y-auto ${openDropDownUniverse ? 'max-h-9 ' : 'max-h-0'} ${open ? 'max-h-48' : 'max-h-0'} ${openDropDownUniverse === false ? 'hidden' :''}`}>
                                    <div className='flex items-center py-2 px-2 bg-white text-black cursor-pointer'>
                                        Universo {selectedUniverse}
                                    </div>
                                    
                                    {  
                                        ordenMayorMenor.map((item, id)=>{
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

                    

                </div>

                
                
                <div className="bg-image animate__animated animate__pulse "></div>
                <div className="image-1 animate__animated animate__pulse"></div>
                <h1 className="titulo animate__animated animate__pulse">Prueba del drag??n</h1>
           
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
                                    className="btn-ficha text-transparent  hover:visible hover:text-[#1E1E1E] hover:bg-white hover:transition-all rounded-xl w-32 
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