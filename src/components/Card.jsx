import './card.css'

const Card = ({name, universe, img}) =>{
    return(
        <div className="card flex justify-center">
            <div className="h-56 text-center">
                <h2>{name}</h2>
                <p>{universe}</p>
                <img className="w-32 h-44 mt-4" src={img} alt="" />
            </div>
        </div>
    )
}
export default Card