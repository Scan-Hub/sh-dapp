import * as yup from "yup";

export const schemaAccelerator = yup.object().shape({
    //description
    description_company_name: yup
      .string()
      .required("Company name is a required field"),
    description_website: yup.string().required("Website is a required field"),
    description_country: yup
      .string()
      .ensure()
      .required("Country is a required field"),
    description_location: yup.string().required("Location is a required field"),
    description_email: yup
      .string()
      .email("Not a proper email")
      .required("Email is a required field"),
    description_phone: yup
      .string()
      .ensure()
      .required("Phone is a required field"),
    description_date: yup.string().required("Date is a required field"),
    description_certificate: yup
      .string()
      .required("Bussiness registration certificate is a required field"),
    description_twitter: yup.string(),
    description_telegram: yup.string(),
    description_discord: yup.string(),
    description_medium: yup.string(),
    description_founded_date: yup.string().required("Date is a required field"),
    description_number_of_employees: yup
      .string()
      .ensure()
      .required("Number of employees is a required field"),
    description_sector: yup
      .array()
      .min(1, "Sector of investment field must have at least 1 item")
      .required("Sector of investment is a required field"),
    description_stage: yup
      .array()
      .min(1, "Stage of investment field must have at least 1 item")
      .required("Stage of investment is a required field"),
    description_operating_status: yup
      .string()
      .ensure()
      .required("Operating Status is a required field"),
    description_other_category: yup.array(),
    // .min(1, "Stage of investment field must have at least 1 item")
    // .required("Stage of investment is a required field"),
    description_about_company: yup
      .string()
      .required("About company is a required field"),
    description_upload_logo: yup.string().required("Logo is a required field"),
    description_upload_id_front: yup.string(),
    description_upload_id_back: yup.string(),
  
    //portfolio
    portfolio_investment: yup
      .string()
      .required("Number of Investment is a required field"),
    portfolio_fund_amount: yup
      .string()
      .required("Total Fund Amount is a required field"),
    portfolio_project_name: yup
      .string()
      .required("Project name is a required field"),
    portfolio_website: yup.string().required("Website is a required field"),
});