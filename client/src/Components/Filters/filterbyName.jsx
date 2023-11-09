import { useDispatch } from "react-redux";
import { orderByName } from "../../Redux/actions/index";
import  './FilterbyName.style.css';


const OrderByName = () => {
  const dispatch = useDispatch();

  const onSelectedChange = (event) => {
    event.preventDefault();

    dispatch(orderByName(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
        <option value="" hidden>
          Name 
        </option>
        <option  value="Ascendente">Name A-Z  </option>
        <option value="Descendente">Name Z-A </option>
        
        
      </select>
    </>
  );
};

export default OrderByName;