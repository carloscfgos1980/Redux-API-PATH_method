import './App.css';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Gallery from './components/Gallery';
import Store from './components/Store';
import { getDataAsync } from './redux/gallerySlice';


const App = () => {

  const {paintingsData, isLoading, addedPainting} = useSelector(state=>state.data);
  console.log("addedPainting", addedPainting)
	const dispatch = useDispatch();

useEffect(() => {
		dispatch(getDataAsync())
	}, [dispatch])

  return (
    <div className="todo-list">
      <h1>Hello Motherfucker</h1>
      <h1>Gallery</h1>
      {paintingsData.map(paint=>(
        <Gallery key={paint.id} paint={paint}/>
      ))}
      <h1>Store</h1>
      {addedPainting.map(paint=>(
        <Store key={paint.id} paint={paint}/>
      ))}
    </div>
  );
}


export default App;