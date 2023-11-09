import { useDispatch } from "react-redux";
import { orderByBirth } from "../../Redux/actions/index";
import  './orderbyBirth.style.css';
const OrderByBirth = () => {
  const dispatch = useDispatch();

  const onSelectedChange = (event) => {
    event.preventDefault();

    dispatch(orderByBirth(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
        <option value="" hidden>
        Birth &#9733;
        </option>
        <option value="Ascendente">Ascendente ↑</option>
        <option value="Descendente">Descendente ↓ </option>
      </select>
    </>
  );
};

export default OrderByBirth;