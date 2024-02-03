import { CleanLS } from "./store"

// const apiDomain = "https://api.nexster.xyz"  // backend nginx proxy domain
// const webDomain = "https://nexster.xyz"  // front end Domain
const token = "token"
const bdOwnerConsumer = "bdOwner"

const apiDomain = "http://192.168.1.101"  
const webDomain = "http://localhost:3000"

// Paths
export const bdLoginPath = "/boarding/login"
export const bdAdsPath = "/boarding/ads"
export const bdOwnerRegPath = "/boarding/owner/reg"
export const afterBdOwnerRegPath = "/boarding/owner/after-reg"

export function makeFullPath(path){
  return `${webDomain}${path}`
}

function isNot2xxStatusCode(statusCode) {
    if(typeof(statusCode) !== "number") return false
    return statusCode < 200 || statusCode > 299;
  }

// Status codes
const unAuthCode = 401

export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthorizedError";
  }
}

// GET request with Authorization Header
async function get(url) {
    let bearTkn = localStorage.getItem(token)
    if(bearTkn === null) {
      CleanLS()
      throw new UnAuthorizedError("token is not existed")
    }
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': bearTkn
      }
    });
    if(resp.status === unAuthCode) {
      CleanLS()
      throw new UnAuthorizedError("Attempted to access unauthorized resources")
    }
    if (isNot2xxStatusCode(resp.status)) {
      return null
    }
    return await resp.json();
}

async function post(url, reqBody) {
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    CleanLS()
    throw new UnAuthorizedError("token is not existed")
  }
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': bearTkn,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  });

  if(resp.status === unAuthCode) {
    CleanLS()
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if (isNot2xxStatusCode(resp.status)) {
    return null
  }
  return await resp.json();
}

// POST request without Authorization Header
async function postWithoutAuth(url, reqBody) {

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  });

  const status = resp.status

  if( 400 <= status && status <= 499) {
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if ( status <= 199 || status >= 500 ) {
    return null
  }
  return await resp.json();
}

// genders and bills are []string{}
export async function ListAds(page, pageSize, minRent, maxRent, maxDist, minBeds, maxBeds, minBaths, maxBaths, genders, bills, sortType) {
  let url = `${apiDomain}/g/bdf/ads?mnr=${minRent}&mxr=${maxRent}&mxd=${maxDist}&mnb=${minBeds}&mxb=${maxBeds}&mnba=${minBaths}&mxba=${maxBaths}&sort=${sortType}&pg=${page}&pgSize=${pageSize}`
  
  url = addQueryParams(url, "for", genders)
  url = addQueryParams(url, "b", bills)
  const respBody = await get(url)
  if(respBody === null) return {data: [], resultsCount: 0, total: 0}
  return {data: respBody.data, resultsCount: respBody.resultsCount, total: respBody.total}
}

function addQueryParams(url, key, values){
  if( !Array.isArray(values) ) return url
  for(const val of values) {
    url = url + `&${key}=${val}`
  }
  return url
}

export async function GetAd(id){
  const respBody = await get(`${apiDomain}/g/bdf/ads/${id}`)
  if(respBody === null) return {ad: null, owner: null }

  return { ad: respBody.ad, owner: respBody.owner }
}

export async function GetAccessTokenForBdOwner(phoneNo, password) {
  let respBody = await postWithoutAuth(`${apiDomain}/p/u/auth/token`, {
    "id": phoneNo,
    "passwd": password,
    "consumer": bdOwnerConsumer
  })
  if(respBody === null) return { access_token: "", id: "" }
  return { access_token: respBody.data?.access_token, id: respBody.data?.id }
}

export async function ValidateBdUser(){
  const respBody = await post(`${apiDomain}/p/bdf/users/validate`, {})
  if(respBody === null) return false

  return true
}

export async function CreateBdOwner(name, mainContact, password, address){ 
  const respBody = await postWithoutAuth(`${apiDomain}/p/bdf/auth/owner`, {
    "name": name,
    "mainContact": mainContact,
    "otherContacts": [],
    "email": "",
    "password": password,
    "imageUrl": "",
    "address": address,
    "location": ""
  })
  if(respBody === null) return false
  return true
}
