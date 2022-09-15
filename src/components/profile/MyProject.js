import React, { useCallback, useEffect, useState } from "react";
import DefaultAvatar from "../../assets/images/profile/default_logo_scanhub.png";
import Edit from "../../assets/images/profile/Edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjects } from "../../actions";
import { selectMyProjects } from "../../reducers/user/project.reducer";

const MyProject = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const myProjects = useSelector(selectMyProjects);

  const onFetchMyProject = useCallback(() => {
    dispatch(
      getMyProjects({
        page: page,
        page_size: 20,
      })
    );
  }, [dispatch, page]);

  const onEditProject = () => {};

  useEffect(() => {
    onFetchMyProject();
  }, [onFetchMyProject]);

  return (
    <div className="w-full mb-28">
      <div className="grid grid-cols-3 gap-4 px-6 py-[34px]">
        {myProjects?.map((e, i) => (
          <div key={i} className="flex bg-[#191B2A] p-4 overflow-hidden">
            <img
              className="max-h-[124px]"
              src={e?.project_logo ? e?.project_logo : DefaultAvatar}
              alt=""
            />
            <div className="w-full flex flex-col ml-[24px]" key={i}>
              <p className="relative font-montserrat_medium text-[#656881] flex">
                {e?.project_name}{" "}
                <button type="button" onClick={onEditProject}>
                  <img
                    className="absolute right-0 float-right"
                    src={Edit}
                    alt=""
                  />
                </button>
              </p>
              <div className="mt-[24px]">
                <p
                  className={
                    e?.kyc
                      ? " font-poppins_medium bg-[#00AF71] rounded-[32px] w-fit px-[14px] py-[6px]"
                      : "font-poppins_medium bg-[#FFC132] rounded-[32px] w-fit px-[14px] py-[6px]"
                  }
                >
                  {e?.kyc ? "Verified" : "Verifying"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProject;
