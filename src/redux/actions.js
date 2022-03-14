import { Constants } from "./constants";

export const setCurrent = (email) => (dispatch) => {
  dispatch({
    type: Constants.SETCURRENT,
    payload: email,
  });
};

/* export const unsetCurrent = () => (dispatch) => {
  dispatch({
    type: Constants.UNSETCURRENT,
  });
};

export const setFilterProp = (query) => (dispatch) => {
  dispatch({
    type: Constants.SETFILTER,
    payload: query,
  });
}; */

export const setMail =
  (page = 1) =>
  async (dispatch) => {
    let data = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
    let { list } = await data.json();

    dispatch({
      type: Constants.SETMAIL,
      payload: list,
    });
  };

export const markFav = (id) => (dispatch) => {
  dispatch({
    type: Constants.MARKFAVORITE,
    payload: id,
  });
};

export const markRead = (id) => (dispatch) => {
  dispatch({
    type: Constants.MARKREAD,
    payload: id,
  });
};
