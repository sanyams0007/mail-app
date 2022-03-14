import MailCard from "../components/MailCard";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setMail } from "../redux/actions";

export default function MailList({ handleClick, query, setIsVisible }) {
  const { mails, read, favorite } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMail(page));
  }, [dispatch, page]);

  useEffect(() => {
    setIsVisible(false);
  }, [query, page, setIsVisible]);

  // const [currentFilter, setCurrentFilter] = useState({
  //   read: [],
  //   favorite: []
  // });

  // useEffect(() => {
  //   setCurrentFilter((prevState) => ({
  //     ...prevState,
  //     read: [...read],
  //     favorite: [...favorite]
  //   }));
  // }, [read, favorite]);

  return (
    <div className="nav">
      {mails
        .filter(({ id }) =>
          query === "read"
            ? read.includes(id)
            : query === "favorite"
            ? favorite.includes(id)
            : true
        )
        ?.map((email, idx) => (
          <MailCard
            data={email}
            key={`${email?.id}${idx}`}
            handleClick={handleClick}
          />
        ))}

      {!["read", "favorite"].includes(query) && (
        <div>
          <button
            className="btn border round"
            disabled={page - 1 === 0 ? true : false}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <button
            className="btn border round"
            disabled={page + 1 === 3 ? true : false} // as of now it is hardcoded butif the no page chnage in future it can also be made to work dymaically by checking last page with current + 1
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

//alternate approach
// {mails?.map((email, idx) => {
//   if (currentFilter[filter]?.includes(email.id)) {
//     return (
//       <MailTile
//         data={email}
//         key={`${email?.id}${idx}`}
//         handleClick={handleClick}
//       />
//     );
//   } else if (filter === "unread") {
//     return (
//       <MailTile data={email} key={email?.id} handleClick={handleClick} />
//     );
//   } else return null;
// })}
