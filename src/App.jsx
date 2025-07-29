import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [products , setProducts] = useState([]);
  const [page , setPage] = useState(1);

  
  const fetchData = async () => {


    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if(data && data.products){

      setProducts(data.products);
    }
    
  };
  
  console.log(products);

  useEffect(() => {
    fetchData();
  },[])


  const selectPageHandler = (selectedPage) => {

    if(selectedPage >= 1 && selectedPage <= products.length / 10){
      
      setPage(selectedPage);
    }
     
  }


  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
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
          <span onClick={() => selectPageHandler(page-1)}>⏮️</span>
          {

          //Array(int) creates an empty array i.e. [empty,empty,empty,...]
          //These "empty slots" are not actual undefined values, and some array methods like map might skip them.
          //spread syntax [...] converts those empty slots into undefined values e.g. [undefined, undefined, undefined...],
          //which ensures that methods like map will iterate over them.
           [...Array(products.length / 10)].map((_,i) =>{
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
          <span onClick={() => selectPageHandler(page+1)}>⏭️</span>
        </div>
      }
    </div>
  )
}

export default App
