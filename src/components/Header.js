const btnConfig = ["Unread", "Read", "Favorite"];

export default function Header({ setQuery, query }) {
  /*  const { filter: query } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClick = (filter) => {
    dispatch(setFilterProp(filter));
    dispatch(unsetCurrent());
  };
 */

  return (
    <header className="flex">
      <p className="left">Filter By:</p>
      <ul className="flex">
        {btnConfig.map((name, idx) => (
          <li key={idx}>
            <button
              style={{ fontSize: "16px" }}
              className={`btn border round right ${
                query === name.toLowerCase() ? "filter" : ""
              }`}
              onClick={(e) => {
                setQuery(name.toLowerCase());
              }}
              // onClick={() => handleClick(name.toLowerCase())}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
