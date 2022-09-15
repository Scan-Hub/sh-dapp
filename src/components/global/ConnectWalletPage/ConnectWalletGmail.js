import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import IcGmail from "../../../assets/images/wallets/gmail.svg";
import { auth } from "../../../services/firebase.services";
import { useDispatch, useSelector } from "react-redux";
import { alertActions, authLoginGoogle, authLogoutGoogle } from "../../../actions";
import { randomKeyUUID } from "../../../_helpers/utils/lib";
import {
  selectDataGoogle,
  updateDataGoogle,
} from "../../../reducers/auth.reducer";
import { storageConstants } from "../../../constants/storage.constants";
import "../styles.scss";
import { web3Constants } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { openEditModal } from "../../../reducers/user/profile.reducer";


const ConectWalletGmail = ({ _wallet, onChangeWallet, getLocalWallet }) => {

  const navigate = useNavigate();
  const dataLoginGoogle = useSelector(selectDataGoogle);
  const dataGoogle = JSON.parse(
    localStorage.getItem(storageConstants.dataGoogle)
  );
  const key = randomKeyUUID();
  const dispatch = useDispatch();
  const [loadingGG, setLoadingGG] = useState(false);
  const [email, setEmail] = useState(dataGoogle?.email);
  const [logged, setLogged] = useState(dataGoogle !== null ? true : false);

  const keyWallet = "gmail";

  useEffect(() => {
    if (dataLoginGoogle) {
      setLogged(true);
      setLoadingGG(false);
    }
  }, [dataLoginGoogle]);

  const handleLoginGoogle = async () => {
    if (!logged) {
      setLoadingGG(true);
      dispatch(
        alertActions.loading(
          {
            title: "Connecting",
            description: `Connect Google waiting...`,
          },
          key
        )
      );
      await signInWithPopup(auth, new GoogleAuthProvider())
        .then((res) => {
          console.log("signInWithPopup");
          loginGoogle(res);
          setEmail(res.user.email);
        })
        .catch((err) => {
          setLoadingGG(false);
          dispatch(
            alertActions.update(
              {
                title: "Connect",
                status: "warning",
                description: err.message,
              },
              key
            )
          );
        });
    }
  };

  const loginGoogle = async (res) => {
    await dispatch(
      authLoginGoogle({
        token: res.user.accessToken,
        email: res.user.email
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        const { data } = originalPromiseResult;
        if (data && data.access_token) {
          onChangeWallet(keyWallet);
          localStorage.removeItem("_acc");
          dispatch({
            type: web3Constants.WEB3_DISCONNECT,
            web3: null,
            account: null,
          });
          dispatch(
            alertActions.update(
              {
                status: "success",
                title: "Login Sucessfully",
                description: `Do you want to update more information?`,
                details:{
                  url:"../profile",
                  label:"Update Information",
                  color:"#699B8C",
                  action: () => dispatch(openEditModal())
                }
              },
                key
              )
          );

          setTimeout(() => {
            navigate("../profile", { replace: true });
          }, 1000);

        }
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          alertActions.update(
            {
              title: "Connect",
              status: "warning",
              description: rejectedValueOrSerializedError.message,
              detail:{
                url:"../profile",
                label:"Update Information",
                color:"#699B8C",
                action: () => dispatch(openEditModal())
              }
            },
            key
          )
        );
      });
  };

  const handleLogoutGoogle = async () => {
    onChangeWallet("");
    signOut(auth);
    setLogged(false);
    await dispatch(authLogoutGoogle());
  };

  return (
    <>
      <button
        disabled={loadingGG}
        className={`${loadingGG ? "bg-table-bg-column" : "bg-white/5"
          } w-full flex flex-row items-center justify-between py-[18px] px-6 rounded-lg min-w-[180px]`}
        onClick={logged ? handleLogoutGoogle : handleLoginGoogle}
      >
        <div className="flex flex-row w-full items-center">
          <div className="w-fit flex items-center">
            <img src={IcGmail} alt="gmail_logo" className="w-8 h-8" />
            <p className="text-[18px] font-montserrat_semi_bold ml-[24px]">
              {logged && email !== null && _wallet=== keyWallet
                ? email
                : loadingGG
                  ? "Connecting..."
                  : "Gmail"}</p>
          </div>
        </div>
        {getLocalWallet(keyWallet)}
        {loadingGG && <div className="loading" />}
      </button>
    </>
  );
};

export default ConectWalletGmail;
