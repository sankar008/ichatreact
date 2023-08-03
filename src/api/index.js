import axios from "axios";
import * as c from "./constant";

// ? REGISTRATION API
export const user_registration = async (data) => {
  try {
    const url = c.SIGNUP;
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER API
export const user_updated = async (data) => {
  try {
    const url = c.USER;
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER API
export const user_details = async (data, header) => {
  try {
    const url = c.USER + "/" + header;

    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(data),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER email verified
export const user_emailVerified = async (data) => {
  try {
    const url = c.USER + "/email-verified";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER LOGIN
export const user_login = async (data) => {
  try {
    const url = c.USER + "/login";
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? USER email forgot
export const user_email_forgot = async (data) => {
  try {
    const url = c.USER + "/forgot-password";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER reset password
export const user_newPassword = async (data) => {
  try {
    const url = c.USER + "/reset-password";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER API GET
export const user_get_id = async (data) => {
  try {
    const url = c.USER;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? GROUPS ADD API
export const groups_create = async (data, header) => {
  try {
    const url = c.GROUPS;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? GROUPS UPDATE API
export const groups_Update = async (data, header) => {
  console.log("header", header);
  try {
    const url = c.GROUPS;
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? GROUPS JOIN
export const groups_join = async (data, header) => {
  console.log("header", header);
  try {
    const url = c.GROUPSJOIN;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? GROUPS JOIN
export const groups_exit = async (data, header) => {
  console.log("header", header);
  try {
    const url = c.SIGNUP + "/exists";
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? show groups
export const groups_showing = async (header) => {
  try {
    const url = c.GROUPS;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? show CATEGORYS
export const groups_categorys = async (header) => {
  try {
    const url = c.CATEGORYS;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? show groups by id
export const groups_showByid = async (data, header) => {
  try {
    const url = c.GROUPS + "/" + header;
    const res = await axios.get(url, {
      headers: JSON.parse(data),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? show groups by id edit
export const groups_showByid_edit = async (data, header) => {
  try {
    const url = c.GROUPS + "/edit/" + data;

    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? suggest frind list
export const suggestFriend = async (data, header) => {
  try {
    const url = c.SUGGESTFRIEND + "/" + data;

    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FREIND REQUEST
export const freind_request = async (data, header) => {
  try {
    const url = c.FREINDS;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FREIND UNFREIND
export const freind_unferind = async (data, header) => {
  try {
    const url = c.FREINDS + "/unfriend/" + data.id + "/" + data.userId;
    const res = await axios.delete(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FREIND LISTING
export const freind_listing = async (data, header) => {
  try {
    const url = c.FREINDS + "/get-request/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FREIND LISTING
export const freind_listing_search = async (data, header) => {
  try {
    const url = c.FREINDS + "/search/" + data.id + "/" + data.value;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FREIND REQUEST ACCEPTS

export const freind_request_accepts = async (data, header) => {
  try {
    const url = c.FREINDS + "/accept";
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? ALL FREIND REQUEST
export const freind_listing_all = async (data, header) => {
  try {
    const url = c.FREINDS + "/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? ALL FREIND REQUEST
export const freind_listing_send_get = async (data, header) => {
  try {
    const url = c.FREINDS + "/get-send-request/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST PUBLISH
export const feed_post_publish = async (data, header) => {
  try {
    const url = c.POST;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED ALBUM POST
export const feed_album_publish = async (data, header) => {
  try {
    const url = c.POST + "/album/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST UPDATE
export const feed_post_update = async (data, header) => {
  try {
    const url = c.POST;
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? ALL FEED POST SHOWING
export const all_feedPostShow = async (data, header) => {
  try {
    const url = c.POST + "/all/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST SHOWING BY ID
export const feedPostShow_byid = async (data, header) => {
  try {
    const url = c.POST + "/" + data;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ?  FEED POST DELETE
export const feedPostDelete = async (postcode, header) => {
  try {
    const url = c.POST + "/" + postcode;
    const res = await axios.delete(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ?  FEED POST DELETE
export const feedPostAddImg = async (data, header) => {
  try {
    const url = c.POST + "/add-image";
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ?  FEED POST DELETE
export const feedPostRemoveImg = async (data, header) => {
  try {
    const url = c.POST + "/remove-image";
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST COMMENT
export const feed_post_comment = async (data, header) => {
  try {
    const url = c.COMMENT;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const feed_post_comment_update = async (data, header) => {
  try {
    const url = c.COMMENT;
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST COMMENT SHOW
export const feed_post_comment_show = async (header, commentData) => {
  try {
    const url = c.COMMENT + "/post/" + commentData;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST COMMENT REPLAY
export const feed_comment_reply = async (data, header) => {
  try {
    const url = c.COMMENT + "/reply";
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST LIKE COUNT
export const feed_post_like = async (data, postCode, header) => {
  try {
    const url = c.POST + "/like/" + data + "/" + postCode;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST DISLIKE COUNT
export const feed_post_dislike = async (data, postCode, header) => {
  try {
    const url = c.POST + "/dislike/" + data + "/" + postCode;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? User skilss
export const user_skills = async (header) => {
  try {
    const url = c.USERSKILSS;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? FEED POST DISLIKE COUNT
export const feed_post_likeUser = async (postCode, header) => {
  try {
    const url = c.POST + "/get-like/" + postCode;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const user_chatroomShow = async (data, header) => {
  try {
    const url = c.CHATROOME + "/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? ALL FREIND REQUEST
export const group_prticepent = async (data, header) => {
  try {
    const url = c.CHATROOME + "/participants/" + data.id + "/" + data.userId;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? ALL FREIND REQUEST
export const group_prticepent_remove = async (data, header) => {
  try {
    const url =
      c.CHATROOME +
      "/participant/remove/" +
      data.chatroomCode +
      "/" +
      data.removeuserCode +
      "/" +
      data.removeByuserCode;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const user_details_byNav = async (data, header) => {
  try {
    const url = c.CHATROOME + "/participants/" + data.id + "/" + data.userId;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const user_chatroom_add = async (data, header) => {
  try {
    const url = c.CHATROOME;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const user_groups_edit = async (data, header) => {
  try {
    const url = c.CHATROOME;
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const user_chatroomShow_byid = async (data, header) => {
  try {
    const url = c.CHATROOME + "/show/" + data;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const user_chatroomget = async (data, header) => {
  try {
    const url = c.CHAT + "/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const user_degree = async (header) => {
  try {
    const url = c.DEGREE;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const user_empType = async (header) => {
  try {
    const url = c.EMPTYPE;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const user_indastry = async (header) => {
  try {
    const url = c.INDUSTRY;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const user_chathistory = async (data, header) => {
  try {
    const url = c.CHAT + "/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? CHAT GET API DONE
export const chat_send = async (data, header) => {
  try {
    const url = c.CHAT;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const storyAdd = async (data, header) => {
  try {
    const url = c.STORY;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? CHAT GET API DONE
export const story_getbyId = async (data, header) => {
  try {
    const url = c.STORY + "/user/" + data;
    const res = await axios.get(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};