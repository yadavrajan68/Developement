import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home()  {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('LoggedInUser'));
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem('Token');
    localStorage.removeItem('LoggedInUser');
    handleSuccess('Logged out successfully');
    setTimeout(()=>{
     navigate('/login');
    },1000)
  }

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('Token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
      console.log(err);
    }
  }

useEffect(()=>{
  fetchProducts();
},[])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products.map((item, index)=>{
            return (<ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>);
          })
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
