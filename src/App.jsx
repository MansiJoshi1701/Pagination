import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [products , setProducts] = useState([]);
  const [page , setPage] = useState(1);
  //const [totalPages , setTotalPages] = useState(0);

  
  const fetchData = async () => {


    const res = await fetch("https://dummyjson.com/products?limit=100");  //-->frontend driven approach
    //const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`); //backend driven approach
    //limit & skip = only returns 'limit' no. of products at a time and omits (from the start) 'skip' no. of products
    const data = await res.json();

    if(data && data.products){

      setProducts(data.products);
      //setTotalPages(data.total / 10);
    }
    
  };
  

  useEffect(() => {
    fetchData();

    //if using the backend driven approach, dependency array will have [page]
  },[])


  const selectPageHandler = (selectedPage) => {

    if(selectedPage >= 1 && selectedPage <= products.length/10){

      setPage(selectedPage);
    }
     
  }


  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page*10-10 , page*10).map((prod) => {
          {/* {products.map((prod) => { */}
            return(
              <span className="products__single" key={prod.id}>
                <img src={prod.images} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            )
          })}
        </div>
      )}
      {products.length > 0 && 
        <div className='pagination'>
          <span
            onClick={() => selectPageHandler(page-1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ⏮️
          </span>
          {

          //Array(int) creates an empty array i.e. [empty,empty,empty,...]
          //These "empty slots" are not actual undefined values, and some array methods like map might skip them.
          //spread syntax [...] converts those empty slots into undefined values e.g. [undefined, undefined, undefined...],
          //which ensures that methods like map will iterate over them.

          [...Array(products.length/10)].map((_,i) =>{  
          //  [...Array(totalPages)].map((_,i) =>{  -->backend driven approach
            return(
              <span
                className={page === i+1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i+1)}
              >
                  {i+1}
              </span>
            )
           })
          }
          <span 
            onClick={() => selectPageHandler(page+1)}
            className={page < products.length/10 ? "" : "pagination__disable"}  
            //</div>className={page < totalPages ? "" : "pagination__disable"}  -->backend driven approach
          >
            ⏭️
          </span>
        </div>
      }
    </div>
  )
}

export default App
