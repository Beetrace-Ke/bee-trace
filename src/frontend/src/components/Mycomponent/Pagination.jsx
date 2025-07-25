const Pagination =({cardsPerPage, totalCards, paginate})=>{
   const pageNumbers = [];
   for(let i=1; i<= Math.ceil(totalCards/cardsPerPage);i++){
    pageNumbers.push(i)
   }
    return(
     <>
     <nav>
    <ul className="flex justify-center space-x-2 mt-7">
        {pageNumbers.map((item) => (
            <li key={item} onClick={() => paginate(item)} className="cursor-pointer">
                <a href="#" className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-blue-500 hover:text-white transition">
                    {item}
                </a>
            </li>
        ))}
    </ul>
</nav>

     </>
    )
}

export default Pagination