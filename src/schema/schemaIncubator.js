import * as yup from "yup";

export const schemaIncubator = yup.object().shape({
  //description
  logo: yup.string().required("Logo is a required field"),
  name: yup.string().required("Company name is a required field"),
  website: yup.string().required("Website is a required field"),
  country: yup.string().ensure().required("Country is a required field"),
  location: yup.string().required("Location is a required field"),
  email: yup
    .string()
    .email("Not a proper email")
    .required("Email is a required field"),
  phone: yup.string().ensure().required("Phone is a required field"),
  vcs_description_date: yup
    .string()
    .nullable()
    .required("Date is a required field"),

  business_registration_certificate: yup
    .string()
    .required("Bussiness registration certificate is a required field"),
  vcs_description_twitter: yup.string(),
  vcs_description_telegram: yup.string(),
  vcs_description_discord: yup.string(),
  vcs_description_medium: yup.string(),
  founded_date: yup.string().nullable().required("Date is a required field"),
  number_of_employees: yup
    .string()
    .ensure()
    .required("Number of employees is a required field"),
  sectors_of_investment: yup
    .array()
    .min(1, "Sector of investment field must have at least 1 item")
    .required("Sector of investment is a required field"),
  stage_of_investment: yup
    .array()
    .min(1, "Stage of investment field must have at least 1 item")
    .required("Stage of investment is a required field"),
  operating_status: yup
    .string()
    .ensure()
    .required("Operating Status is a required field"),
  vcs_description_other_category: yup.array(),
  // .min(1, "Stage of investment field must have at least 1 item")
  // .required("Stage of investment is a required field"),
  about_company: yup.string().required("About company is a required field"),
  vcs_description_upload_id_front: yup.string(),
  vcs_description_upload_id_back: yup.string(),

  //portfolio
  total_number_of_investment: yup
    .string()
    .required("Number of Investment is a required field"),
  total_funding_amount: yup
    .string()
    .required("Total Fund Amount is a required field"),
  portfolios: yup.array().of(
    yup.object().shape({
      logo: yup.string(),
      name: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Name is a required field");
      }),
      website: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Webste is a required field");
      }),
      // social_media: yup.object().when("logo", (logo) => {
      //   if (typeof logo !== "undefined")
      //     return yup.object().shape({
      //       twitter: yup.string().required("Twitter is a required field"),
      //       telegram: yup.string().required("Telegram is a required field"),
      //     });
      // }),
    })
  ),
  partners: yup.array().of(
    yup.object().shape({
      logo: yup.string(),
      name: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Name is a required field");
      }),
      website: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Webste is a required field");
      }),
    })
  ),
  team_members: yup.array().of(
    yup.object().shape({
      image: yup.string(),
      name: yup.string().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup.string().required("Name is a required field");
      }),
      title: yup.string().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup.string().required("Title is a required field");
      }),
      description: yup.string().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup.string().required("Description is a required field");
      }),
      email: yup.string().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup
            .string()
            .email("Not a proper email")
            .required("Email is a required field");
      }),
      phone: yup.string().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup.string().required("Phone is a required field");
      }),
    })
  ),
});
