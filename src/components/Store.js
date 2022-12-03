import { useDispatch, useSelector } from "react-redux";
import { paintNotReservedAsync, removePainting } from "../redux/gallerySlice";

const Store = ({paint}) => {
    const dispatch =useDispatch();
    const removePaint=(item)=>{
        dispatch(removePainting(item));
        dispatch(paintNotReservedAsync(item))
    }
    return ( 
        <div>
            <ul>
                <li>title: {paint.title}</li>
                <li>price: {paint.price}</li>
                <button
                onClick={()=>removePaint(paint)}
                >delete
                </button>
            </ul>

        </div>
     );
}
 
export default Store;