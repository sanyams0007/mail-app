import { formatDate } from "../utils/formatDate";
import Avatar from "./common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../redux/actions";
import { useEffect, useState } from "react";
import { formatStr } from "../utils/formatStr";

function MailCard({ data, handleClick }) {
  const { from, short_description, subject, date, id } = data;
  const dispatch = useDispatch();
  const { read, favorite } = useSelector((state) => state);
  const [isRead, setIsRead] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const clickHandler = () => {
    dispatch(setCurrent(data));
    handleClick(id);
  };

  useEffect(() => {
    setIsRead(read.includes(String(id)));
  }, [read, id]);

  useEffect(() => {
    setIsFav(favorite.includes(String(id)));
  }, [favorite, id]);

  return (
    <div
      className={`mail-tile border flex ${isRead ? "read-tile" : ""}`}
      onClick={clickHandler}
    >
      <div className="side left">
        <Avatar char={from?.name[0]} />
      </div>
      <div className="side right">
        <p>
          From:{" "}
          <strong>
            {formatStr(from?.name)}
            &lt;{from?.email}&gt;
          </strong>
        </p>
        <p>
          Subject: <strong> {subject}</strong>
        </p>
        <p className="nowrap">{short_description}</p>
        <p>
          {formatDate(date)}
          {isFav && <span className="fav">Favorite</span>}
        </p>
      </div>
    </div>
  );
}

export default MailCard;
