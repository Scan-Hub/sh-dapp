import * as yup from "yup";

const regexWeb =
  // /^$|(^(https):\/\/)[a-z0-9-%]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*#?\/?[a-zA-Z0-9#-]?$/;
  /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
export const applyProjectSchema = yup.object().shape({
  project_logo: yup.string(),
  project_name: yup.string().required("Project name is a required field"),
  project_web: yup.string().matches(regexWeb, "Enter correct website!"),
  whitepaper: yup.string(),
  source_code: yup.string(),
  road_map: yup.string(),
  communities: yup.array().of(
    yup.object().shape({
      link: yup.string().matches(regexWeb, "Enter correct website!"),
      type: yup.string(),
    })
  ),
  smart_contracts: yup.array().of(
    yup.object().shape({
      chain: yup.string(),
      contract: yup.string(),
    })
  ),
  token_symbol: yup.string(),
  category_type_sector: yup
    .array()
    .min(1, "Sector of category field must have at least 1 item")
    .required("Sector of category is a required field"),
  audit_company_sector: yup
    .array()
    .min(1, "Sector of audit field must have at least 1 item")
    .required("Sector of audit is a required field"),
  listing_status: yup
    .string()
    .ensure()
    .required("Listing Status is a required field"),
  launching_date: yup.string().required("Launching date is a required field"),
  apply_project_team_members: yup
    .array()
    .of(
      yup.object().shape({
        profile_picture: yup.string(),
        profile_name: yup
          .string()
          .when("profile_picture", (profile_picture) => {
            if (typeof profile_picture !== "undefined")
              return yup.string().required("Name is a required field");
          }),
        title: yup.string().when("profile_picture", (profile_picture) => {
          if (typeof profile_picture !== "undefined")
            return yup.string().required("Title is a required field");
        }),
        description: yup.string().when("profile_picture", (profile_picture) => {
          if (typeof profile_picture !== "undefined")
            return yup.string().required("Description is a required field");
        }),
        email: yup.string().when("profile_picture", (profile_picture) => {
          if (typeof profile_picture !== "undefined")
            return yup
              .string()
              .email("Not a proper email")
              .required("Email is a required field");
        }),
        phone_number: yup.string(),
        linkedin: yup.string(),
      })
    )
    .test({
      message: "Team members field must have at least 1 member",
      test: (arr) =>
        arr.filter((x) => x.profile_picture !== undefined).length > 0,
    }),
  apply_project_partners: yup.array().of(
    yup.object().shape({
      logo: yup.string(),
      name: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Name is a required field");
      }),
      link: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup
            .string()
            .matches(regexWeb, "Enter correct website!")
            .required("Website is a required field");
      }),
    })
  ),
  about_projects: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      description: yup.string().when("title", (title) => {
        if (title === "Highlights" || title === "Description")
          return yup.string().required(`${title} is a required field`);
      }),
    })
  ),
});

export const applyCompanySchema = yup.object().shape({
  company_name: yup
    .string()
    .required("Company name is a required field")
    .test("len", "Must be exactly 5 characters", (val) => val.length === 5),
  company_country: yup
    .string()
    .ensure()
    .required("Country is a required field"),
  company_location: yup.string().required("Location is a required field"),
  company_email: yup
    .string()
    .email("Not a proper email")
    .required("Email is a required field"),
  company_phone: yup.string().ensure().required("Phone is a required field"),
});

export const ventureCapitalSchema = yup.object().shape({
  //description
  logo: yup.string().required("Logo is a required field"),
  name: yup.string().required("Company name is a required field"),
  website: yup
    .string()
    .matches(regexWeb, "Incorrect url!")
    .required("Website is a required field"),
  country: yup.string().ensure().required("Country is a required field"),
  location: yup.string().required("Location is a required field"),
  email: yup
    .string()
    .email("Not a proper email")
    .required("Email is a required field"),
  phone: yup.object().shape({
    code: yup.string(),
    prefix: yup.string(),
    number: yup.string().required("Phone is a required field"),
  }),
  business_registration_certificate: yup
    .string()
    .required("Bussiness registration certificate is a required field"),
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
  community: yup
    .array()
    .of(
      yup.object().shape({
        code: yup.string(),
        link: yup
          .string()
          .matches(
            /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Incorrect url!"
          ),
      })
    )
    .min(1)
    .required("Community field must have at least 1 item"),
  other_categories: yup.array(),
  // .min(1, "Stage of investment field must have at least 1 item")
  // .required("Stage of investment is a required field"),
  about_company: yup.string().required("About company is a required field"),
  founder_ids1: yup.string(),
  founder_ids2: yup.string(),

  //Portfolio
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
          return yup
            .string()
            .matches(
              /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              "Incorrect url!"
            )
            .required("Webste is a required field");
      }),
      social_media: yup.array().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup
            .array()
            .of(
              yup.object().shape({
                code: yup.string(),
                link: yup
                  .string()
                  .matches(
                    /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Incorrect url!"
                  ),
              })
            )
            .min(1)
            .required("Community field must have at least 1 item");
      }),
    })
  ),

  //Team & Partner,
  partners: yup.array().of(
    yup.object().shape({
      logo: yup.string(),
      name: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Name is a required field");
      }),
      website: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup
            .string()
            .matches(
              /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              "Incorrect url!"
            )
            .required("Webste is a required field");
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
      phone: yup.object().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup.object().shape({
            code: yup.string(),
            prefix: yup.string(),
            number: yup.string().required("Phone is a required field"),
          });
      }),
      linkedin: yup.string().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup
            .string()
            .matches(
              /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              "Incorrect url!"
            );
      }),
    })
  ),
});

export const companySchema = yup.object().shape({
  //description
  logo: yup.string().required("Logo is a required field"),
  name: yup.string().required("Company name is a required field"),
  website: yup
    .string()
    .matches(
      /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Incorrect url!"
    )
    .required("Website is a required field"),
  country: yup.string().ensure().required("Country is a required field"),
  location: yup.string().required("Location is a required field"),
  email: yup
    .string()
    .email("Not a proper email")
    .required("Email is a required field"),
  phone: yup.object().shape({
    code: yup.string(),
    prefix: yup.string(),
    number: yup.string().required("Phone is a required field"),
  }),
  business_registration_certificate: yup
    .string()
    .required("Bussiness registration certificate is a required field"),
  founded_date: yup.string().nullable().required("Date is a required field"),
  number_of_employees: yup
    .string()
    .ensure()
    .required("Number of employees is a required field"),
  industries: yup
    .array()
    .min(1, "Industry field must have at least 1 item")
    .required("Industry is a required field"),
  operating_status: yup
    .string()
    .ensure()
    .required("Operating Status is a required field"),
  community: yup
    .array()
    .of(
      yup.object().shape({
        code: yup.string(),
        link: yup
          .string()
          .matches(
            /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Incorrect url!"
          ),
      })
    )
    .min(1)
    .required("Community field must have at least 1 item"),
  about_company: yup.string().required("About company is a required field"),
  founder_ids1: yup.string(),
  founder_ids2: yup.string(),

  //Portfolio
  number_of_investment_received: yup
    .string()
    .required("Number of Investment Received is a required field"),
  total_fund_received: yup
    .string()
    .required("Total Fund Received is a required field"),
  portfolios: yup.array().of(
    yup.object().shape({
      logo: yup.string(),
      name: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Name is a required field");
      }),
      website: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup
            .string()
            .matches(
              /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              "Incorrect url!"
            )
            .required("Webste is a required field");
      }),
      social_media: yup.array().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup
            .array()
            .of(
              yup.object().shape({
                code: yup.string(),
                link: yup
                  .string()
                  .matches(
                    /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Incorrect url!"
                  ),
              })
            )
            .min(1)
            .required("Community field must have at least 1 item");
      }),
      status: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined") return yup.string();
      }),
    })
  ),

  //Team & Partner,
  partners: yup.array().of(
    yup.object().shape({
      logo: yup.string(),
      name: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup.string().required("Name is a required field");
      }),
      website: yup.string().when("logo", (logo) => {
        if (typeof logo !== "undefined")
          return yup
            .string()
            .matches(
              /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              "Incorrect url!"
            )
            .required("Webste is a required field");
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
      phone: yup.object().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup.object().shape({
            code: yup.string(),
            prefix: yup.string(),
            number: yup.string().required("Phone is a required field"),
          });
      }),
      linkedin: yup.string().when("image", (image) => {
        if (typeof image !== "undefined")
          return yup
            .string()
            .matches(
              /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              "Incorrect url!"
            );
      }),
    })
  ),
});
