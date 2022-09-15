
import Web3 from 'web3';

const waitTron = () => {
     return  new Promise((resolve, reject) => {
        let attempts = 0 ,maxAttempts = 0;
        const checkTron  =() => {
            console.log(window.tronWeb);
            if (window.tronWeb) {
                resolve(true);
                return;
            }
            attempts++;
            if(attempts >= maxAttempts) {
                reject(false)
                return;
            }
            setTimeout(checkTron,100);
        }
        checkTron();

     });
}   

const getWeb3 = async () => {

    let tronExists = await waitTron();
    if(!tronExists){
        return;
    }

    try {
        return new Web3(window.tronWeb);
    } catch (error) {
        console.error(error);
    }
    
};

export default getWeb3;