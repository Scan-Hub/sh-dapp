/**
 * * Upload
 */
export const PREFIX = "iapi"
export const UPLOAD_ENDPOINT = "/uploader"
export const UPLOAD_IMAGE_ENDPOINT = `${UPLOAD_ENDPOINT}/${PREFIX}/image`

/**
 * * Search
 */
export const SEARCH_ENDPOINT = "/search"
export const SEARCH_EXPLORE_ENDPOINT = `${SEARCH_ENDPOINT}/explore`
export const SEARCH_QUERY_ENDPOINT = `${SEARCH_ENDPOINT}/query`
export const SEARCH_QUERY_CUSTOM_ENDPOINT = `${SEARCH_QUERY_ENDPOINT}/custom`

export const SEARCH_HOT_KEYWORD_ENDPOINT = `${SEARCH_EXPLORE_ENDPOINT}/hot_keyword`
export const SEARCH_TRENDING_ENDPOINT = `${SEARCH_EXPLORE_ENDPOINT}/trending`
export const SEARCH_RECENTLY_ADD_ENDPOINT = `${SEARCH_EXPLORE_ENDPOINT}/recently_add`
export const SEARCH_RELATIVE_ENDPOINT = `${SEARCH_EXPLORE_ENDPOINT}/relative`

/**
 * * Metadata
 */
export const METADATA_ENDPOINT = "/metadata"
export const METADATA_ADS_ENDPOINT = `${METADATA_ENDPOINT}/ads`
export const METADATA_NEWS_ENDPOINT = `${METADATA_ENDPOINT}/news`
export const METADATA_NEWS_DETAIL_ENDPOINT = (id) =>
  `${METADATA_ENDPOINT}/news/${id}`;
export const METADATA_FORM_TYPES_ENDPOINT = `${METADATA_ENDPOINT}/form_types`;
export const METADATA_FORM_ENDPOINT = `${METADATA_ENDPOINT}/form`;
export const METADATA_FORM_SCAM_ENDPOINT = `${METADATA_ENDPOINT}/form/scam`;
export const METADATA_FORM_DETAIL_ENDPOINT = (id) =>
  `${METADATA_ENDPOINT}/form/${id}`
export const METADATA_FAKE_VOTE_ENDPOINT = (id) =>
  `${METADATA_ENDPOINT}/form/vote/${id}`
export const METADATA_FEED_CMC_ENDPOINT = `${METADATA_ENDPOINT}-feed/query`

/**
 * * Project Form
 */
export const PROJECT_FORM_ENDPOINT = "/form"
export const PROJECT_DETAIL_FORM_ENDPOINT = (id) =>
  `${METADATA_ENDPOINT}${PROJECT_FORM_ENDPOINT}/${id}`

/**
 * * Video Review
 */
export const VIDEO_REVIEW_ENDPOINT = "/video-review"
export const VIDEO_REVIEW_LIST_VIDEO_ENDPOINT = `${VIDEO_REVIEW_ENDPOINT}/video`

/**
 * * Partner
 */
export const PARTNER_ENDPOINT = "/partner"

/**
 * * Third party
 */
export const COUNTRIES_ISO =
  "https://countriesnow.space/api/v0.1/countries/flag/images"
export const COUNTRIES_FLAG_DIAL =
  "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode"
