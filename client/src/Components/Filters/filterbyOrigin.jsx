import { useDispatch } from "react-redux";
import { originFilter } from "../../Redux/actions/index";
import  './filterbyOrigin.style.css';
const FilterOrigin = () => {
  const dispatch = useDispatch();

  const onSelectedChange = (event) => {
    event.preventDefault();

    dispatch(originFilter(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
        <option value="" hidden>
           Origin
        </option>
        <option value="AllOrigins">All Origin</option>
        <option value="API">API</option>
        <option value="DB">DB</option>
      </select>
    </>
  );
};

export default FilterOrigin;