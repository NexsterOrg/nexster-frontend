import { CleanLS } from "./store"

// const apiDomain = "https://api.nexster.xyz"  // backend nginx proxy domain
// const webDomain = "https://nexster.xyz"  // front end Domain
const token = "token"

const apiDomain = "http://192.168.1.101"  
const webDomain = "http://localhost:3000"

// Paths
export const bdLoginPath = "/boarding/login"

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

// genders and bills are []string{}
export async function ListAds(page, pageSize, minRent, maxRent, maxDist, minBeds, maxBeds, minBaths, maxBaths, genders, bills, sortType) {
  let url = `http://localhost:8005/bdfinder/ads?mnr=${minRent}&mxr=${maxRent}&mxd=${maxDist}&mnb=${minBeds}&mxb=${maxBeds}&mnba=${minBaths}&mxba=${maxBaths}&sort=${sortType}&pg=${page}&pgSize=${pageSize}`
  
  url = addQueryParams(url, "for", genders)
  url = addQueryParams(url, "b", bills)
  let respBody = await get(url)
  if(respBody === null) return {data: [], resultsCount: 0}
  return {data: respBody.data, resultsCount: respBody.resultsCount}
}

function addQueryParams(url, key, values){
  if( !Array.isArray(values) ) return url
  for(const val of values) {
    url = url + `&${key}=${val}`
  }
  return url
}
