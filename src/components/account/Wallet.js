
import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import * as actions from '../../actions';

const Wallet = () => {

    const { account } = useSelector(state => state.web3, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {

        if (window.ethereum && window.ethereum.isMetaMask) {

            window.ethereum.on('accountsChanged', accountChangeHandler);

            // window.ethereum.on('chainChanged', chainChangeHandler);

        }

        const timer = setTimeout(() => {
            fetchWeb3Init(false);
        }, 1000);

        return () => clearTimeout(timer);

    }, []);

    async function fetchWeb3Init(loadDefault) {

        const _wallet = localStorage.getItem('_wallet');
        
        if(_wallet === "metamask" ){
            await dispatch(actions.web3ConnectEther(loadDefault));// true is account conected reload contract
        }

        if(_wallet === "tronLink" ){
            await dispatch(actions.web3ConnectTron(loadDefault));// true is account conected reload contract
        }

        // await dispatch(actions.instantiateRINZContracts());
        // await dispatch(actions.instantiateBUSDContracts());

    }

    async function accountChangeHandler(accounts) {

        if (accounts.length > 0) {

            // if (account === null) {
            //     fetchWeb3Init(false)
            // }

            if (accounts[0] !== account && account) {
                // await dispatch(actions.instantiateBUSDContracts());
                // await dispatch(actions.getMyListNfts());
            }

        } else {
            await dispatch(actions.web3Disconnect());

        }
    }

    const chainChangeHandler = () => {
        window.location.reload()
    }

    return (
        <></>
    );


}
export default Wallet;

