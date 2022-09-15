import React from "react";
import { ScanJob } from "../../../../assets";
import TalentExcerpt from "./TalentExcerpt";

const data = [
  {
    name: "Ryker",
    avatar: ScanJob.ImgDefaultAvatar,
    rated: 5.0,
    reviews: 5967,
    salary: "$2000/month",
    experiences:
      "Web Services, Backend Development, Dart, Frontend Development, Google APIs",
    overview:
      "Over 9+ years of the experience in Website Development and Mobile development for IOS and Android. Hybrid app design and development using Flutter and IONIC app development with latest version . I represent a high-experienced team that has strong skills in mobile IOS and Android development and Website...",
  },
  {
    name: "Ryker",
    avatar: ScanJob.ImgDefaultAvatar,
    rated: 5.0,
    reviews: 5967,
    salary: "$2000/month",
    experiences:
      "Web Services, Backend Development, Dart, Frontend Development, Google APIs",
    overview:
      "Over 9+ years of the experience in Website Development and Mobile development for IOS and Android. Hybrid app design and development using Flutter and IONIC app development with latest version . I represent a high-experienced team that has strong skills in mobile IOS and Android development and Website...",
  },
  {
    name: "Ryker",
    avatar: ScanJob.ImgDefaultAvatar,
    rated: 5.0,
    reviews: 5967,
    salary: "$2000/month",
    experiences:
      "Web Services, Backend Development, Dart, Frontend Development, Google APIs",
    overview:
      "Over 9+ years of the experience in Website Development and Mobile development for IOS and Android. Hybrid app design and development using Flutter and IONIC app development with latest version . I represent a high-experienced team that has strong skills in mobile IOS and Android development and Website...",
  },
  {
    name: "Ryker",
    avatar: ScanJob.ImgDefaultAvatar,
    rated: 5.0,
    reviews: 5967,
    salary: "$2000/month",
    experiences:
      "Web Services, Backend Development, Dart, Frontend Development, Google APIs",
    overview:
      "Over 9+ years of the experience in Website Development and Mobile development for IOS and Android. Hybrid app design and development using Flutter and IONIC app development with latest version . I represent a high-experienced team that has strong skills in mobile IOS and Android development and Website...",
  },
  {
    name: "Ryker",
    avatar: ScanJob.ImgDefaultAvatar,
    rated: 5.0,
    reviews: 5967,
    salary: "$2000/month",
    experiences:
      "Web Services, Backend Development, Dart, Frontend Development, Google APIs",
    overview:
      "Over 9+ years of the experience in Website Development and Mobile development for IOS and Android. Hybrid app design and development using Flutter and IONIC app development with latest version . I represent a high-experienced team that has strong skills in mobile IOS and Android development and Website...",
  },
  {
    name: "Ryker",
    avatar: ScanJob.ImgDefaultAvatar,
    rated: 5.0,
    reviews: 5967,
    salary: "$2000/month",
    experiences:
      "Web Services, Backend Development, Dart, Frontend Development, Google APIs",
    overview:
      "Over 9+ years of the experience in Website Development and Mobile development for IOS and Android. Hybrid app design and development using Flutter and IONIC app development with latest version . I represent a high-experienced team that has strong skills in mobile IOS and Android development and Website...",
  },
  {
    name: "Ryker",
    avatar: ScanJob.ImgDefaultAvatar,
    rated: 5.0,
    reviews: 5967,
    salary: "$2000/month",
    experiences:
      "Web Services, Backend Development, Dart, Frontend Development, Google APIs",
    overview:
      "Over 9+ years of the experience in Website Development and Mobile development for IOS and Android. Hybrid app design and development using Flutter and IONIC app development with latest version . I represent a high-experienced team that has strong skills in mobile IOS and Android development and Website...",
  },
];

const TalentContent = () => {
  return (
    <div className="flex flex-1 flex-col gap-8">
      {data.map((candidate, index) => (
        <TalentExcerpt key={index} data={candidate} />
      ))}
    </div>
  );
};

export default TalentContent;
