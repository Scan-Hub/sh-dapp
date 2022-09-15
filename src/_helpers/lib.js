import { ethers } from "ethers";
import queryString from 'query-string';
var CryptoJS = require("crypto-js");

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatTimeStamp(date) {
  if (date) {
    const newDate = new Date(date);
    const timestamp = newDate.getTime();
    // 👇️ If you need to convert milliseconds to seconds
    const timestampSeconds = Math.floor(timestamp / 1000);
    return timestampSeconds;
  }
}
export function formatGetUTCTime(time) {
  const date = new Date(time * 1000);
  return `${date.getUTCDate()} Th ${date.getUTCMonth()} ${date.getUTCFullYear()}`;
}

export function formatNumberEther(amount) {
  const amountN = Number(ethers.utils.formatEther(amount, { commify: true }));
  return numberWithCommas(Math.round(amountN * 100) / 100);
}

export function formatUriSecure(url) {
  const currentDate = new Date();
  const secureKey = process.env.REACT_APP_SECURE_KEY;
  const secureTime = process.env.REACT_APP_SECURE_TIME;

  let expireTime = currentDate.getTime() / 1000 + Number(secureTime);
  expireTime = Math.round(expireTime);

  let secure_link = `${secureKey}${expireTime}${url}`;
  secure_link = CryptoJS.MD5(secure_link, "binary").toString(
    CryptoJS.enc.Base64
  );
  secure_link = secure_link.replaceAll("+", "-");
  secure_link = secure_link.replaceAll("/", "_");
  secure_link = secure_link.replace(/=/g, "");

  return url + `?st=${secure_link}&e=${expireTime}`;
}
export const reverseString = (string) => {
  var splitString = string.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
};

export const addressWalletCompact = (address) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

export const showPrice = (price) => {
  if (price) {
    let priceFormat = ethers.utils.formatEther(price.toString());
    priceFormat = Math.round(priceFormat * 100) / 100;
    return priceFormat.toFixed(2);
  }
};

export const showPriceVND = (price, currency) => {
  if (price) {
    return `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + currency;
  }
};

export const parseDescription = (description) => {
  let result = description.split(`\n`);
  return result;
};

export function arrayMove(arr, oldIndex, newIndex) {
  if (newIndex >= arr.length) {
    var k = newIndex - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}

export function formatBalanceString(x) {
  return Number(x).toLocaleString();
}

export function dataURLtoFile(dataUrl, filename) {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function nFormatter(num, digits = 8) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function getQueryURl(link, page) {

  let parsed = queryString.parse(link);

  // parsed.page = page || parsed.page || 1;

  parsed.limit = 100;

  let query = {};

  Object.keys(parsed || {}).forEach(key => {
      if ([
          'type',
          'query',
          'page',
          'limit'
      ].includes(key)) {
          if (parsed[key] !== null && parsed[key] !== undefined && parsed[key] !== '') {
              query[key] = parsed[key];
          }

      }
  })

  return {
      path: queryString.stringify(query),
      data: query
  }

}
