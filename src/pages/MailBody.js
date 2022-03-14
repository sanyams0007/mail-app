import { useSelector } from "react-redux";
import Avatar from "../components/common/Avatar";
import { formatDate } from "../utils/formatDate";
import { useDispatch } from "react-redux";
import { markFav, markRead } from "../redux/actions";
import { useEffect, useState } from "react";

export default function MailBody() {
  const [childs, setChilds] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { currentMail } = useSelector((state) => state);
  const { from, date, subject, id } = currentMail;

  const handleFavClick = () => dispatch(markFav(id));

  useEffect(() => {
    setLoading(true);
    setChilds([]);
    const parseHTML = async () => {
      try {
        const res = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
        const { body } = await res.json();
        const parsedBody = await new DOMParser().parseFromString(
          body,
          "text/xml"
        );
        const childrens = Array.from(parsedBody["children"][0]["children"]);
        setChilds(childrens);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    parseHTML();
    dispatch(markRead(id));
  }, [id, dispatch]);

  return (
    <section className="mail-body border flex">
      <div className="side left">
        <Avatar char={from?.name[0]} />
      </div>
      <div className="side right">
        <div className="flex body-head">
          <h2>{subject}</h2>
          <button
            disabled={loading ? true : false}
            className="btn fav round"
            onClick={handleFavClick}
          >
            Mark as favorite
          </button>
        </div>
        <p style={{ paddingBottom: "20px" }}>{formatDate(date)}</p>
        <div>
          {childs?.map(({ textContent }, idx) => (
            <p key={idx} className="body-para">
              {textContent}
            </p>
          ))}
          {loading && <h3 className="loading">...Loading</h3>}
        </div>
      </div>
    </section>
  );
}
