import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, teamsFilter } from "../../Redux/actions/index";
import './filterTeams.style.css';

const FilterTeams = () => {
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const onSelectedChange = (event) => {
    event.preventDefault();
    dispatch(teamsFilter(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
        <option value="all" hidden>
          Teams
        </option>
        <option value="AllTeams">All Teams</option>
        {teams?.map((t, index) => (
      <option key={index} value={t}>
        {t}
      </option>
    ))}
      </select>
    </>
  );
};

export default FilterTeams;
