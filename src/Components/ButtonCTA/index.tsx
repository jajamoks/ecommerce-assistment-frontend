import { ButtonCTAProps } from "./types";
import { isEmpty } from "lodash";

export const ButtonCTA: React.FC<ButtonCTAProps> = ({
  state,
  ItemId,
  dispatch,
  added,
  content,
  onclick
}): JSX.Element => {

  const handleClick = () => {
    alert(ItemId);

    if(onclick) onclick()

    const action: string = added ? "REMOVE" : "ADD_TO_CART";
    dispatch && dispatch({ type: action, payload: ItemId })
  }

  return(
    <button className={`ButtonCTA ${added && "added"}`} onClick={handleClick}>
      {
        content ? content
        :
        added ? `Remove` : `Add to cart`
      }
    </button>
  )
}