const InfoDetalle = ({titulo, dato}) => {
    return(
        <div className="grid grid-cols-2 w-64">
            <span className="bg-[#CE0014] text-white h-10 my-2 rounded-l-lg flex justify-center items-center">{titulo}</span>
            <span className="bg-[#1E1E1E] text-white my-2 rounded-r-lg flex justify-center items-center">{dato}</span>
        </div>
    )
}

export default InfoDetalle