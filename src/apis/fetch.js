import { CleanLS } from "./store";

export const apiDomain = "https://api.nexster.xyz"; // backend nginx proxy domain
const webDomain = "https://nexster.xyz"; // front end Domain
const token = "token";

// nexster paths
export const NxterHome = "/home";

export const accCreateLinkPath = "/account/reg-link";
export const accCreatePath = "/account/reg";

// Paths
export const LoginPath = "/login";
export const FriendsRoute = "/friends";
export const FriendsRequestRoute = "/friends/request";
export const FriendSuggsRoute = "/friends/suggs";
export const AllFriendsRoute = "/friends/my";
export const PasswordResetLinkPath = "/account/password-reset-link";

export const MyEventsListRoute = "/events/my";

export const SearchResultsRoute = "/search/results";

// Status codes
const unAuthCode = 401;

export function MkUserProfilePageLink(indexNo) {
  return `${webDomain}/index/${indexNo}`;
}

export function MkFullPath(path) {
  return `${webDomain}/${path}`;
}

export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthorizedError";
  }
}

function dataURItoBlob(dataURI) {
  if (typeof dataURI !== "string") return null;
  return dataURI.split(",")[1];
  // const byteString = atob(dataURI.split(',')[1]);
  // const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // const ab = new ArrayBuffer(byteString.length);
  // const ia = new Uint8Array(ab);
  // for (let i = 0; i < byteString.length; i++) {
  //   ia[i] = byteString.charCodeAt(i);
  // }
  // console.log("img: ", byteString)
  // return new Blob([ab], { type: mimeString });
}

// GET request with Authorization Header
async function get(url) {
  let bearTkn = localStorage.getItem(token);
  if (bearTkn === null) {
    CleanLS();
    throw new UnAuthorizedError("token is not existed");
  }
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearTkn,
    },
  });
  if (resp.status === unAuthCode) {
    CleanLS();
    throw new UnAuthorizedError("Attempted to access unauthorized resources");
  }
  if (!resp.ok) {
    return null;
  }
  return await resp.json();
}

// PUT request with Authorization Header
async function put(url, reqBody) {
  let bearTkn = localStorage.getItem(token);
  if (bearTkn === null) {
    CleanLS();
    throw new UnAuthorizedError("token is not existed");
  }
  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: bearTkn,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  if (resp.status === unAuthCode) {
    CleanLS();
    throw new UnAuthorizedError("Attempted to access unauthorized resources");
  }
  if (!resp.ok && resp.status !== 201) {
    return null;
  }
  return await resp.json();
}

// POST request with Authorization Header
async function post(url, reqBody) {
  let bearTkn = localStorage.getItem(token);
  if (bearTkn === null) {
    CleanLS();
    throw new UnAuthorizedError("token is not existed");
  }
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearTkn,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  if (resp.status === unAuthCode) {
    CleanLS();
    throw new UnAuthorizedError("Attempted to access unauthorized resources");
  }
  if (!resp.ok && resp.status !== 201) {
    return null;
  }
  return await resp.json();
}

async function postCustom(url, headers, body) {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: body,
  });

  if (resp.status === unAuthCode) {
    CleanLS();
    throw new UnAuthorizedError("Attempted to access unauthorized resources");
  }
  if (!resp.ok && resp.status !== 201) {
    return null;
  }
  return await resp.json();
}

// POST request without Authorization Header
async function postWithoutAuth(url, reqBody) {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  const status = resp.status;
  if (400 <= status && status <= 499) {
    throw new UnAuthorizedError("Attempted to access unauthorized resources");
  }
  if (status <= 199 || status >= 500) {
    return null;
  }
  return await resp.json();
}

async function del(url) {
  let bearTkn = localStorage.getItem(token);
  if (bearTkn === null) {
    CleanLS();
    throw new UnAuthorizedError("token is not existed");
  }
  let resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: bearTkn,
    },
  });

  if (resp.status === unAuthCode) {
    CleanLS();
    throw new UnAuthorizedError("Attempted to access unauthorized resources");
  }

  if (!resp.ok) {
    return null;
  }
  return await resp.json();
}

export async function ListRecentPosts(userId, sinceDate, postCount) {
  let posts = await get(
    `${apiDomain}/recent_posts/${userId}?last_post_at=${sinceDate}&max_post_count=${postCount}`
  );
  if (posts === null) return [];
  return posts;
}

export async function UpdateReactions(
  mediaKey,
  reactionKey,
  viewerKey,
  reqBody
) {
  await put(
    `${apiDomain}/reactions/${reactionKey}?media_id=${mediaKey}&reactor_id=${viewerKey}`,
    reqBody
  );
}

export async function CreateReaction(mediaKey, viewerKey, reqBody) {
  const res = await post(
    `${apiDomain}/reactions?media_id=${mediaKey}&reactor_id=${viewerKey}`,
    reqBody
  );
  if (res === null) return "";
  return res.data.key;
}

export async function ListFriendsForPool(
  faculty,
  gender,
  birthday,
  page,
  pageSize
) {
  let respBody = await get(
    `${apiDomain}/t/friend_sugs/v2/${faculty}?page=${page}&page_size=${pageSize}&gender=${gender}&birthday=${birthday}`
  );
  if (respBody === null) return { data: [], resultsCount: 0 };
  return { data: respBody.data, resultsCount: respBody.results_count };
}

export async function ListFriendSuggs(page, pageSize) {
  let respBody = await get(
    `${apiDomain}/friend_sugs?page=${page}&page_size=${pageSize}`
  );
  if (respBody === null) return { data: [], resultsCount: 0 };
  return { data: respBody.data, resultsCount: respBody.results_count };
}

export async function GetProfileInfo(userId) {
  let info = await get(`${apiDomain}/u/users/${userId}`);
  if (info === null) return {};
  return info.data;
}

export async function GetFriendCount(userId) {
  let countObj = await get(`${apiDomain}/u/friends/${userId}/count`);
  if (countObj === null) return -1; // to indicate an error
  return countObj.data.count;
}

///u/indexnos/:index_no
export async function GetUserKeyByIndexNo(indexNo) {
  let respBody = await get(`${apiDomain}/u/indexnos/${indexNo}`);
  if (respBody === null) return { key: "", isOwner: false };
  return { key: respBody.data?.key, isOwner: respBody.data?.isOwner || false };
}

export async function ListMediaRoleBased(imgOwnerId, page, pageSize) {
  let respBody = await get(
    `${apiDomain}/t/r/media/${imgOwnerId}?page=${page}&page_size=${pageSize}`
  );
  if (respBody === null) return [];
  return respBody.data;
}

export async function ListFriendReqs(page, pageSize) {
  let respBody = await get(
    `${apiDomain}/u/friend_req?page=${page}&page_size=${pageSize}`
  );
  if (respBody === null) return { data: [], size: 0 };
  return {
    data: respBody.data,
    size: respBody.results_count,
  };
}

export async function GetAllFriendReqsCount() {
  let respBody = await get(`${apiDomain}/u/friend_req/count`);
  if (respBody === null) return 0;
  return respBody.data.count;
}

export async function AcceptFriendReq(friendReqId, data) {
  let respBody = await post(`${apiDomain}/u/friend_req/${friendReqId}`, data);
  if (respBody === null) return false;
  return true;
}

export async function IgnoreFriendReq(friendReqId, otherId) {
  let respBody = await del(
    `${apiDomain}/u/friend_req/${friendReqId}/ignore?other_id=${otherId}`
  );
  if (respBody === null) return false;
  return true;
}

export async function SendFriendReq(data) {
  let respBody = await post(`${apiDomain}/p/u/friend_req`, data);
  if (respBody === null) return "";
  return respBody.data.friend_req_id;
}

export async function RemoveFriendship(otherFriendId) {
  let respBody = await del(`${apiDomain}/d/u/friend/${otherFriendId}`);
  if (respBody === null) return false;
  if (respBody.data.id1 === "") return false;
  return true;
}

export async function ListMyFriends(pageNo, pageSize) {
  let respBody = await get(
    `${apiDomain}/g/u/all/friends?page=${pageNo}&page_size=${pageSize}`
  );
  if (respBody === null) return { data: [], size: 0, total: 0 };
  return {
    data: respBody.data,
    size: respBody.results_count,
    total: respBody.total_count,
  };
}

export async function ListEvents(pageNo, pageSize, isMy = false) {
  let url = `${apiDomain}/g/s/events?page=${pageNo}&pageSize=${pageSize}`;
  if (isMy)
    url = `${apiDomain}/g/s/my/events?page=${pageNo}&pageSize=${pageSize}`;

  let respBody = await get(url);
  if (respBody === null) return { data: [], size: 0 };
  return {
    data: respBody.data,
    size: respBody.resultsCount,
  };
}

export async function CreateEventReaction(eventKey, reqBody) {
  let respBody = await post(
    `${apiDomain}/p/s/events/${eventKey}/reaction`,
    reqBody
  );
  if (respBody === null) return "";
  return respBody.data.key;
}

export async function SetEventReactionState(reactionKey, reactionType, state) {
  let respBody = await put(
    `${apiDomain}/pu/s/events/reactions/${reactionKey}/${reactionType}/${state}`,
    {}
  );
  if (respBody === null) return false;
  return true;
}

export async function ListEventReactUsers(
  eventKey,
  reactType,
  pageNo,
  pageSize
) {
  let respBody = await get(
    `${apiDomain}/g/s/events/${eventKey}/${reactType}?page=${pageNo}&pageSize=${pageSize}`
  );
  if (respBody === null) return { data: [], size: 0 };
  return {
    data: respBody.data,
    size: respBody.resultsCount,
  };
}

export async function UploadImage(namespace, typeName, base64Image) {
  const blob = dataURItoBlob(base64Image);
  if (blob === null) return "";
  const respBody = await postCustom(
    `${apiDomain}/p/c/images/${namespace}?type=${typeName}`,
    {
      "Content-Type": `image/${typeName}`,
    },
    blob
  );

  return respBody?.data?.imageName || "";
}

export async function CreateEvent(
  imageName,
  typeName,
  title,
  date,
  description,
  venueOrLink,
  mode
) {
  let venue = "",
    eventLink = "";
  if (mode === "physical") venue = venueOrLink;
  else if (mode === "online") eventLink = venueOrLink;

  const respBody = await post(`${apiDomain}/p/s/events`, {
    link: imageName,
    imgType: `image/${typeName}`,
    title: title,
    date: date,
    description: description,
    venue: venue,
    mode: mode,
    eventLink: eventLink,
  });
  const createdEventKey = respBody?.data?.eventKey || "";
  if (createdEventKey === "")
    return { isErr: true, eventKey: "", authorKey: "" };

  const authorKey = respBody?.data?.postedByKey || "";
  if (authorKey === "") return { isErr: true, eventKey: "", authorKey: "" };

  return {
    isErr: false,
    eventKey: createdEventKey,
    authorKey: authorKey,
  };
}

// if failed to create image, this will return null
export async function CreateImagePost(
  imageFullname,
  visibility,
  title,
  description
) {
  let respBody = await post(`${apiDomain}/p/t/posts/image`, {
    link: imageFullname,
    visibility: visibility,
    title: title,
    description: description,
  });
  if (respBody === null)
    return { isErr: true, mediaKey: "", mediaOwnerKey: "" };
  return {
    isErr: false,
    mediaKey: respBody.data?.mediaKey,
    mediaOwnerEdgeKey: respBody.data?.mediaOwnerKey,
  };
}

export async function DeleteImagePost(mediaKey) {
  let respBody = await del(`${apiDomain}/d/t/posts/image/${mediaKey}`);
  if (respBody === null) return false;
  return true;
}

export async function DeleteEvent(eventKey) {
  let respBody = await del(`${apiDomain}/d/s/events/${eventKey}`);
  if (respBody === null) return false;
  return true;
}

export async function SearchUser(keyword) {
  let respBody = await get(`${apiDomain}/g/se/users?q=${keyword}`);
  if (respBody === null) return { data: [], resultsCount: 0 };
  return { data: respBody.data, resultsCount: respBody.results_count };
}

export async function UpdateBasicUserInfo(updatedField) {
  let respBody = await put(`${apiDomain}/pu/u/profile/edit`, updatedField);
  if (respBody === null) return false;
  return true;
}

export async function DeleteUser() {
  let respBody = await del(`${apiDomain}/d/u/profile`);
  if (respBody === null) return false;
  return true;
}

export async function UpdatePassword(oldPassword, newPassword) {
  let respBody = await put(`${apiDomain}/pu/u/profile/password`, {
    cp: oldPassword,
    np: newPassword,
  });
  if (respBody === null) return false;
  return true;
}

export async function GetAccessToken(indexNo, password) {
  let respBody = await postWithoutAuth(`${apiDomain}/p/u/auth/token`, {
    id: indexNo,
    passwd: password,
    consumer: "student",
  });
  if (respBody === null) return { access_token: "", id: "" };
  return { access_token: respBody.data?.access_token, id: respBody.data?.id };
}

export async function SendAccountCreationLink(indexNo, email) {
  let respBody = await postWithoutAuth(`${apiDomain}/p/u/auth/reg-link`, {
    index: indexNo,
    email: email,
  });
  if (respBody === null) return false;
  return true;
}

export async function ValidateAccountCreationLink(
  indexNo,
  email,
  expiredAt,
  hmac
) {
  let respBody = await postWithoutAuth(
    `${apiDomain}/p/u/auth/reg-link/validate`,
    {
      index: indexNo,
      email: email,
      exp: expiredAt,
      hmac: hmac,
    }
  );
  if (respBody === null) return false;
  return true;
}

export async function CreateUserAccount(
  firstName,
  secondName,
  imageId,
  birthday,
  faculty,
  field,
  batch,
  about,
  gender,
  password,
  indexNo,
  email,
  expiredAt,
  hmac
) {
  let respBody = await postWithoutAuth(`${apiDomain}/p/u/auth/reg`, {
    firstName: firstName,
    secondName: secondName,
    imageId: imageId,
    birthday: birthday,
    faculty: faculty,
    field: field,
    batch: batch,
    about: about,
    gender: gender,
    password: password,
    index: indexNo,
    email: email,
    exp: expiredAt,
    hmac: hmac,
  });
  if (respBody === null) return false;
  return true;
}

export async function SendPasswordResetLinkFunc(email) {
  let respBody = await postWithoutAuth(
    `${apiDomain}/p/u/auth/password/reset-link`,
    { email: email }
  );
  if (respBody === null) return false;
  return true;
}

export async function validatePasswordResetLink(email, exp, hmac) {
  let respBody = await postWithoutAuth(
    `${apiDomain}/p/u/auth/password/reset-validation`,
    {
      email: email,
      exp: exp,
      hmac: hmac,
    }
  );
  if (respBody === null) return false;
  return true;
}

export async function resetPassword(email, exp, hmac, password) {
  let respBody = await postWithoutAuth(`${apiDomain}/p/u/auth/password/reset`, {
    email: email,
    exp: exp,
    hmac: hmac,
    password: password,
  });
  if (respBody === null) return false;
  return true;
}

export async function GetAnyTypePostForTimeline(pageNo, pageSize) {
  let respBody = await get(`${apiDomain}/g/t/posts/anytype?pg=${pageNo}&pgSize=${pageSize}`)
  if(respBody === null ) return {data: [], nextPage: 1, count: 0}

  return {
    data: respBody.data,
    nextPage: respBody.nextPg,
    count: respBody.count
  }
}
