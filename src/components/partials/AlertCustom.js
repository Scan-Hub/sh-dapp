import React from "react";
import IcClose from "../../assets/images/toast/close.svg";
import IcSuccess from "../../assets/images/toast/success.svg";
import IcWarning from "../../assets/images/toast/warning.svg";
import { TailSpin } from "react-loading-icons";
import { useDispatch } from "react-redux";
import { openEditModal } from "../../reducers/user/profile.reducer";

const AlertCustom = ({ dataItem, closeToast, status , }) => {
  const { message, isLoading } = dataItem;
  const dispatch = useDispatch();
console.log(message);
  const onUpdate = () =>{
    dispatch(openEditModal())
  }
  const loadIconView = (status) => {
    switch (status) {
      case "success":
        return <img src={IcSuccess} alt="Ic Success" />;
      case "warning":
        return <img src={IcWarning} alt="Ic Warning" />;
      case "loading":
        return <TailSpin className="w-6 h-6 m-2" />;
      default:
        break;
    }
  };
 
  return (
    <div className="flex flex-row items-start justify-between">
      <div className="flex flex-row items-start">
        {loadIconView(status)}
        <div className="flex flex-col pl-6 space-y-1">
          {message.title && (
            <span className="font-poppins font-[600] text-base text-white">
              {message.title}
            </span>
          )}
          {message.description && (
            <span className="font-poppins text-sm text-[#7694DE]">
              {message.description}
            </span>
          )}
          {/* {message.details && (
            <a
              href={`https://explore-testnet.vechain.org/transactions/${message.details?.txid}`}
              target={"_blank"}
              rel="noopener noreferrer"
              className="font-poppins text-sm text-[#FA8C16]"
            >
              {message.details?.message}
            </a>
          )} */}
          {status === "success" ? (
            <div>
              <a className={`text-[${message?.details?.color ?? "#699B8C"}] text-[16px] underline font-montserrat_semi_bold ${message?.details?.className}`}
              onClick={message?.details?.action}
              >
                {message?.details?.label}</a>
            </div>
          ):("") }
        </div>
      </div>
      {isLoading === false && <img src={IcClose} alt="" onClick={closeToast} />}
    </div>
  );
};

export default AlertCustom;
