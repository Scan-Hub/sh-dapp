import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import IcGmail from "../../assets/images/wallets/gmail.svg";
import { auth } from "../../services/firebase.services";
import { useDispatch, useSelector } from "react-redux";
import { alertActions, authLoginGoogle, authLogoutGoogle } from "../../actions";
import { randomKeyUUID } from "../../_helpers/utils/lib";
import {
  selectDataGoogle,
  updateDataGoogle,
} from "../../reducers/auth.reducer";
import { storageConstants } from "../../constants/storage.constants";
import "./styles.scss";
import { web3Constants } from "../../constants";
import { openEditModal } from "../../reducers/user/profile.reducer";

const LoginGmail = ({ _wallet, onChangeWallet, getLocalWallet }) => {
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
                title: "Connected",
                description: `Connect Google successfully`,
                details: {
                  url: "../profile",
                  label: "Update Information",
                  color: "#699B8C",
                  action: () => {
                    
                    dispatch(openEditModal())
                  }
                }
              },
              key
            )
          );
        }
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          alertActions.update(
            {
              title: "Connect",
              status: "warning",
              description: rejectedValueOrSerializedError.message,
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
          } w-full flex flex-row items-center justify-between py-3 px-4 rounded-lg min-w-[180px]`}
        onClick={logged ? handleLogoutGoogle : handleLoginGoogle}
      >
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-row items-center">
            <img src={IcGmail} alt="gmail_logo" className="w-7 h-7" />
            <p className="text-white font-montserrat_semi_bold font-semibold text-sm ml-6 truncate">
              {logged && email !== null && _wallet === keyWallet
                ? "Gmail"
                : loadingGG
                  ? "Connecting..."
                  : "Login with Gmail"}
            </p>
          </div>
          {getLocalWallet(keyWallet)}
          {loadingGG && <div className="loading" />}
        </div>
      </button>
    </>
  );
};

export default LoginGmail;
