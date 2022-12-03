import { useDispatch } from "react-redux";
import { addPainting, paintReservedAsync } from "../redux/gallerySlice";

const Gallery = ({paint}) => {
    const dispatch =useDispatch();
    const addedPainting=(item)=>{
            dispatch(addPainting(item));
            dispatch(paintReservedAsync(item));
    }
    return ( 
        <div>
            <ul>
                <li
                onClick={()=>addedPainting(paint)}
                >title: {paint.title}</li>
                <li>tech: {paint.tech}</li>
                <li>{paint.reserved ? <p>yes</p>: <p>Nope</p>}</li>
            </ul>
        </div>
     );
}
 
export default Gallery;