import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import { ButtonCTA } from "../../Components/ButtonCTA";
import { PageProps } from "../../globalTypes";
// utils
import { initialState, reducer } from "../../globalState";
import { SkeletonSingle } from "../../Containers/SkeletonSingle/";

export const Product: React.FC<PageProps> = (): JSX.Element => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState());
  const { item, isSearching } = state;
  React.useEffect(() => {
    try {
      fetch(
        `https://jifmguoil3.execute-api.ap-southeast-1.amazonaws.com/dev/product/${id}`
      )
        .then((res) => res.json())
        .then((data) => { 
          dispatch({ type: "SEARCH"})
          dispatch({ type: "INITIAL_ITEM", payload: data })
        });
        
    } catch (err) {
      dispatch({ type: "ERROR" });
    }
  }, []);

  const renderContent = () => {
    if (state.item && isSearching) {
      return (
        <section className="Detail">
          <article className="Detail__thumbnail">
            <img src={item.image} alt="" />
          </article>

          <article className="Detail__info">
            <div className="Detail__info--header">
              <h2>{item.name}</h2>
            </div>

            <p className="Detail__info--description">{item.description}</p>

            <div className="Detail__info--meta">
              <span className="Detail__price">{ state.currency } {item.price}</span>
            </div>
            
            <ButtonCTA
                ItemId={item._id}
                dispatch={dispatch}
                added={item.added as boolean }
              />
          </article>
        </section>
      );
    } else {
      if(state.isSearching){
        return(
          <React.Fragment>
            <span className="Home__no-found">No item found</span>
          </React.Fragment>
        )
      }else{
        return(<SkeletonSingle />)
      }
    }
  };
  return renderContent();
};
