import React from "react";
import JobExcerpt from "./JobExcerpt";

const data = [
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
  {
    title: "IT Network Engineer ",
    company_name: "Apple 1AAPL",
    salary: "Negotiable during interview",
    location: "California",
    logo: "",
  },
];

const JobContent = () => {
  return (
    <div className="flex flex-1 flex-col gap-8">
      {data.map((item, index) => (
        <JobExcerpt key={index} data={item} />
      ))}
    </div>
  );
};

export default JobContent;
