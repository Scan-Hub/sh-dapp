import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reports } from "../assets";
import Comments from "../components/reports/Comments";
import Sumary from "../components/reports/Sumary";
import Information from "../components/reports/Information";
import { selectFullDetailForm } from "../reducers/project.reducer";
import { fetchListRelative, fetchProjectFullDetailForm } from "../actions";
import { useParams } from "react-router-dom";

const ReportDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fullDetailForm = useSelector(selectFullDetailForm);

  useEffect(() => {
    dispatch(fetchProjectFullDetailForm(id));
  }, [id]);

  const userCommentData = [
    {
      avatar: reports.imgAvatar1,
      address: "0xfgjhgjj...huhg7683hb",
      date: "01.06.2022",
      comments: [
        "You can't sell the token",
        "Doesn't have a website/social media",
        "Doesn't have a project",
        "Doesn't have blocked liquidity",
      ],
    },
    {
      avatar: reports.imgAvatar2,
      address: "0xfgjhgjj...huhg7683hb",
      date: "01.06.2022",
      comments: [
        "You can't sell the token",
        "Doesn't have a website/social media",
        "Doesn't have a project",
        "Doesn't have blocked liquidity",
      ],
    },
    {
      avatar: reports.imgAvatar3,
      address: "0xfgjhgjj...huhg7683hb",
      date: "01.06.2022",
      comments: [
        "You can't sell the token",
        "Doesn't have a website/social media",
        "Doesn't have a project",
        "Doesn't have blocked liquidity",
      ],
    },
  ];
  return (
    <section className="mx-auto bg-cover bg-center my-12 lg:px-12 xl:px-12 px-4 max-w-[1300px]">
      <div className="flex flex-col lg:flex-row w-full justify-between lg:space-x-8">
        <div className="w-full lg:w-2/3 overflow-hidden">
          {fullDetailForm &&
            fullDetailForm?.items &&
            Object.keys(fullDetailForm?.items).length && (
              <Sumary data={fullDetailForm?.items} />
            )}
        </div>
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          {fullDetailForm &&
            fullDetailForm?.items &&
            Object.keys(fullDetailForm?.items).length && (
              <Information data={fullDetailForm?.items} />
            )}
        </div>
      </div>
      <div className="flex flex-col justify-center mt-12 space-y-4">
        {userCommentData.map((item, index) => (
          <Comments key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default ReportDetailPage;
