
import { ethers } from 'ethers';
import { alertActions } from './alert.actions';
import { userConstants, web3Constants } from '../constants';
import { authService } from '../services';

import getWeb3Ether from '../utils/getWeb3Ether';
import getWeb3Tron from '../utils/getWeb3Tron';
import * as actions from '.';

const WEFUND_TRON_WALLET = "TJ512gBWfie4ett3u8nmyYeuZHQXDamcuQ";

const chainID = process.env.REACT_APP_NETWORK_ID;
const networks = {
    bsc_testnet: {
        chainId: `0x${Number(97).toString(16)}`, // A 0x-prefixed hexadecimal string
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "tBNB", // 2-6 characters long
            decimals: 18,
        },
        rpcUrls: [
            "https://data-seed-prebsc-1-s1.binance.org:8545",
            "https://data-seed-prebsc-2-s1.binance.org:8545",
            "https://data-seed-prebsc-1-s2.binance.org:8545",
            "https://data-seed-prebsc-2-s2.binance.org:8545",
            "https://data-seed-prebsc-1-s3.binance.org:8545",
            "https://data-seed-prebsc-2-s3.binance.org:8545"
        ],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18
        },
        rpcUrls: [
            "https://bsc-dataseed1.binance.org",
            "https://bsc-dataseed2.binance.org",
            "https://bsc-dataseed3.binance.org",
            "https://bsc-dataseed4.binance.org",
            "https://bsc-dataseed1.defibit.io",
            "https://bsc-dataseed2.defibit.io",
            "https://bsc-dataseed3.defibit.io",
            "https://bsc-dataseed4.defibit.io",
            "https://bsc-dataseed1.ninicoin.io",
            "https://bsc-dataseed2.ninicoin.io",
            "https://bsc-dataseed3.ninicoin.io",
            "https://bsc-dataseed4.ninicoin.io",
            "wss://bsc-ws-node.nariox.org"
        ],
        blockExplorerUrls: ["https://bscscan.com"]
    }
};

async function checkChainSwitch(web3) {

    const chainIdDec = await web3.eth.getChainId();
    return chainID === chainIdDec.toString();

}

function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function web3PersonalSign(message, account) {
    try {
        return await window.ethereum.request({ method: "personal_sign", params: [message, account] })
    } catch (error) {
        console.error(error);
        return false;
    }
};

async function web3PersonalSignTronlink(tronWeb,message) {
    try {
        let HexStr = tronWeb.toHex(message);
        return await tronWeb.trx.sign(HexStr);
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const web3ConnectEther = (isLogin) => async (dispatch) => {

    const web3 = await getWeb3Ether();

    if (web3.givenProvider === null) {
        if (isLogin) {
            dispatch(alertActions.error('Please connect to MetaMask!'));
        }
        return web3;
    }

    let account;
    const chainActived = await checkChainSwitch(web3);
    if (window.ethereum && chainActived === false) {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks[process.env.REACT_APP_NETWORK_NAME]
                }
            ]
        });
        return account;
    }

    // imposition login when khi pruchase and buy
    if (isLogin && !chainActived) {

        try {
            await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `0x${Number(chainID).toString(16)}` }] })
        } catch (error) {
            if (error.code === 4001) {
                dispatch(alertActions.error(error.message));
            }
            if (error.code === 4902) {
                dispatch(alertActions.error("Unrecognized chain ID " + (chainID)));
            }
        }
        return account;
    }

    // Acccounts now exposed
    let checkConected = [];
    let _acc = localStorage.getItem('_acc');
    if (window.ethereum && isLogin) {

        if (isMobileDevice()) {
             checkConected = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        }else{
            await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [
                    {
                        eth_accounts: {}
                    }
                ]
            });
            checkConected = await web3.eth.getAccounts();
        }

       
        if (checkConected.length >0) {
            _acc = checkConected[0];
            localStorage.setItem('_acc', checkConected[0]);
            localStorage.setItem('_wallet', "metamask");
        }

        try {

             // VAlIDATE ACCOUNT
            const dataResMsg = await authService.getMessage(_acc);
            if (Object.keys(dataResMsg.data).length === 0 && dataResMsg.sign_msg) {
                return account;
            }

            // SIGN MESSAGE METAMASK
            const { message, nonce } = dataResMsg.data;
            const signature = await web3PersonalSign(message, _acc);
            
            if (!signature) {
                return account;
            }
            
            // CALL API LOGIN RES TOKEN
            await dispatch(actions.authLogin({
                address: _acc,
                nonce,
                signature
            }));

        } catch (error) {
            console.log(" SIGN MESSAGE METAMASK error: " + error.message);
        }
      
    }

    if (_acc) {
        try {
            checkConected = await web3.eth.getAccounts();
        } catch (error) {
            if (isLogin) {
                dispatch(alertActions.error('Please connect to MetaMask!'));
            }
            return account;
        }
    }

    // account conected when mart chain dapp
    if (checkConected.length > 0 && chainActived === false) {

        try {

            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[process.env.REACT_APP_NETWORK_NAME]
                    }
                ]
            });

        } catch (error) {

            if (error.code === 4001) {
                dispatch(alertActions.error(error.message));
            }

            if (error.code === -32603) {
                dispatch(alertActions.error("Not found network chainId " + process.env.REACT_APP_NETWORK_ID));
            }

        }
        return account;

    }

    // No account access
    if (checkConected.length === 0 && isLogin === false) {

        dispatch({
            type: web3Constants.WEB3_CONNECT,
            web3,
            account
        });

        return account;

    }

    let checkAccount;

    try {

        // connect wallet
        checkAccount = await window.ethereum.enable();

    } catch (e) {

        if (e.code === 4001) {
            dispatch(alertActions.error(e.message))
        }

        return account;

    }

    if (checkAccount) {

        try {

            const accounts = await web3.eth.getAccounts();
            if (accounts && accounts.length > 0) {
                account = localStorage.getItem("address") ? localStorage.getItem("_acc")  : accounts[0];
            }

        } catch (error) {
            console.log("------------web3Connect getAccounts error", error);
        }

        dispatch({
            type: web3Constants.WEB3_CONNECT,
            web3,
            wallet:"metamask",
            account
        });

        return web3;

    }

};

export const web3ConnectTron = (isLogin) => async (dispatch) => {

    const web3 = await getWeb3Tron();

    if (web3.givenProvider === null) {
        if (isLogin) {
            dispatch(alertActions.error('Please connect to TronLink extension!'));
        }
        return web3;
    }

    const tronWeb = window.tronWeb;
    const tronLink = window.tronLink;

    try {
        
        const checkedAccount  = await tronLink.request({
            method: "tron_requestAccounts",
        });

        if(!checkedAccount){
            dispatch(alertActions.error('Please connect to TronLink extension!'));
        }

    } catch (error) {
        console.log("tron_requestAccounts",error);
    }

    const account = tronWeb.defaultAddress.base58;

    if(account && isLogin){

        const dataResMsg = await authService.getMessage(account);

        if (Object.keys(dataResMsg.data).length === 0 && dataResMsg.sign_msg) {
            return account;
        }

        // SIGN MESSAGE METAMASK
        const { message, nonce } = dataResMsg.data;
        const signature = await web3PersonalSignTronlink(tronWeb, message, account);

        if (!signature) {
            return account;
        }
        
        //CALL API LOGIN RES TOKEN
        const dataRes =  await dispatch(actions.authLoginTron({
            address: account,
            nonce,
            signature
        }));

        if(dataRes){

            localStorage.setItem('_acc', account);
            localStorage.setItem('_wallet', "tronLink");
    
            await dispatch({
                type: web3Constants.WEB3_CONNECT,
                web3,
                wallet:"tronLink",
                account
            });

        }

        return account;
    }

};

export const web3Disconnect = () => async (dispatch, getState) => {

    const state = getState();

    dispatch({
        type: web3Constants.WEB3_DISCONNECT,
        web3: null,
        account: null
    });

    dispatch({
        type: userConstants.USER_PROFILE_SUCCESS,
        data:null
    });

    dispatch(actions.authLogout());



};