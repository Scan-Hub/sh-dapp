import React from "react";
import birthday from "../../assets/images/profile/birthday.svg";
import phone from "../../assets/images/profile/phone.svg";
import mail from "../../assets/images/profile/mail.svg";
import defaul_name from "../../assets/images/profile/defaul_name.svg";
import Edit_profile from "../../assets/images/profile/Edit_profile.svg";
import gender from "../../assets/images/profile/gender.svg";
import MyNfts from "../../components/profile/MyNfts";

const Information = ({ infoUser, openModalEvent }) => {
  const date = new Date(Number.parseInt(infoUser?.birthday) * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const info = [
    { img: defaul_name, label: "Default name", data: infoUser?.display_name },
    {
      img: birthday,
      label: "Birthday",
      data: day && month && year ? `${day}/${month}/${year}` : "",
    },
    { img: mail, label: "Mail", data: infoUser?.email },
    { img: phone, label: "Phone", data: infoUser?.phone },
    { img: gender, label: "Gender", data: infoUser?.gender },
  ];
  return (
    <div className="w-full mb-28 px-[28px]">
      <div className="md:hidden block">
        {info.map((e, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center w-fit px-[26px] bg-[#191B2A] py-[20px]"
          >
            <img src={e.img} alt="" />
            <p className="ml-[24px] md:min-w-[112px]">{e.label}</p>
            <p className="ml-[24px] md:min-w-[211px]">{e.data}</p>
          </div>
        ))}
      </div>
      <div className="md:block hidden">
        <div className="relative info-user flex w-full px-[26px] bg-[#191B2A] py-[20px]">
          {info.map((e, i) => (
            <div key={i} className="flex w-1/5 items-center">
              <div className="flex w-full flex-col items-center">
                <img className="mb-6" src={e.img}  alt=""/>
                <p className="text-[14px]">{e.data}</p>
              </div>
              <span
                className={
                  i !== 4 && "border-r w-[1px] h-[48px] border-[#656881] "
                }
              ></span>
            </div>
          ))}
          <div
            onClick={openModalEvent}
            className="absolute cursor-pointer flex p-2 edit-button top-0 right-0"
          >
            <img src={Edit_profile} alt="edit" className="w-4 h-6 mr-2" />
            <p className=" font-montserrat_semi_bold text-[13px]">
              Edit Profile
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[#00AF71] text-[18px] font-montserrat_bold mt-[80px] mb-[32px]">
          Subscription
        </p>
      </div>
      <MyNfts />
    </div>
  );
};

export default Information;
