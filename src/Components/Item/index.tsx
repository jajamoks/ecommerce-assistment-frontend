import { ButtonCTA } from "../ButtonCTA";
import { ItemProps } from "./types";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Item: React.FC<ItemProps> = ({ 
  states,
  id, 
  name,
  category,
  price,
  image,
  dispatch,
  added
}): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  
  const handleNavigate = () => {
    dispatch({
      type: "MOVING",
      payload: {current: `/products/${id}`, history: window.location.pathname}
    })
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
    navigate(`/products/${id}`)
  }

  return(
    <div className="Item">
      <div className="Item__thumbnail" onClick={handleNavigate}>
        <img src={image} alt={name} />
      </div>

      <div className="Item__body">
        <h2 onClick={handleNavigate}>{name}</h2>
        <span>{states.currency} {price}</span>
        <span className="Item__category">{category}</span>
      </div>

      <div className="Item__footer">
        <ButtonCTA ItemId={id} dispatch={dispatch} added={added} state={states.shoppingCart} />
      </div>
    </div>
  )
}