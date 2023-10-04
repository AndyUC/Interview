import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import { Product } from "./product";
import axios from "axios";



interface producttype {
  _id: string,
  remain: number,
        name: string,
        price:number,
        category: string,
        imageUrl: string,
        brand: string,
        subcatalog?: string[],
        discount?: number
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<producttype[]>([]);
  const fetchData= async(api:string)=>{
      const client = axios.create({
        baseURL: "http://localhost:3000/" 
      });
      try {
       const  res = await client.get(api)
       console.log(res.data)
      setProducts(res.data)
      } catch (error) {
       console.log(error)
      } 
    }

    useEffect(()=>{
      const api = '/api/v1/product/'
      fetchData(api)
    },[]);
    

  return (
    <div>
      <h2 style={{marginLeft:'20px'}}>GỢI Ý CHO BẠN

      </h2>

      {isLoading || products.length === 0 ?
        <div>Loading</div>
        :
        <div style={{ display: 'flex',flexDirection:'row', flexWrap: 'wrap' }}>
          {products.map((item) =>
            <div style={{ display:'flex',flexDirection:'row', rowGap:'20px', columnGap:'20px', padding: '10px' }}>
              <Product  imageUrl={item.imageUrl}
                         discount={item.discount}
          name={item.name}
      price={item.price}
        id={item._id} key={item._id}/>
            </div>
          )}
        </div>
      }
    </div>
  );
}
