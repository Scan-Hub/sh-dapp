import { useState, useEffect, useCallback } from "react";
import { reports } from "../../assets";
const listToken = [
  {
    iconSymbol: reports.IcBinance,
    title: "Binance-Peg Polkadot Token",
    tokenName: "BPPT",
  },
  {
    iconSymbol: reports.IcPVU,
    title: "Plant vs Undead Token",
    tokenName: "PVU",
  },
];

const reportContentList = [
  "Owners have a history of participating/being",
  "You can't sell the token",
  "Doesn't have a whitepaper",
  "Doesn't have a website/social media",
  "The owners have an excessive amount of the market",
  "Doesn't have a project",
  "The token has been created to pump and dump",
  "Doesn't have blocked liquidity",
  "They are impersonating someone they are not",
  "They are impersonating someone they are not",
  "They use unethical methods of marketing (bots, spam etc..)",
  "There is no direct contact with the resposible person",
  "They don't answer messages since a long time ago",
  "Owners are not transparent",
  "Other",
];
const useReportFacade = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [btnLabel, setBtnLabel] = useState("Continue");
  const [listTokenFilter, setListTokenFilter] = useState(listToken);
  const [selectedToken, setSelectedToken] = useState();
  const [checkedContent, setCheckedContent] = useState([]);
  const [reportDescription, setReportDescription] = useState("");

  const onSearchValueChange = useCallback((value) => {
    setFilterData(listToken, value);
  }, []);
  const setFilterData = (dataList, searchKey) => {
    setListTokenFilter(
      dataList.filter((item) => {
        if (
          item.title.toUpperCase().includes(searchKey.toUpperCase()) ||
          item.tokenName.toUpperCase().includes(searchKey.toUpperCase())
        ) {
          return true;
        }
        return false;
      })
    );
  };

  // step 1
  const onSelectTokenToReport = useCallback((id) => {
    setSelectedToken(getTokenById(id));
    setStep(2);
  }, []);
  const getTokenById = (id) => {
    let result = {};
    listToken.map((item) => {
      if (item.tokenName === id) {
        result = item;
      }
    });
    return result;
  };

  // step2
  const handleCheckClick = useCallback(
    (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setCheckedContent([...checkedContent, value]);
      } else {
        setCheckedContent(checkedContent.filter((e) => e !== value));
      }
    },
    [checkedContent]
  );

  // step 3
  const onChangeReportDescription = useCallback((value) => {
    setReportDescription(value);
  }, []);

  // step4
  const report = () => {
    console.log("checkedContent", checkedContent);
    console.log("selectedToken", selectedToken);
    console.log("reportDescription", reportDescription);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const resetModal = () => {
    setStep(1);
    setListTokenFilter(listToken);
    setCheckedContent([]);
    setSelectedToken();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    resetModal();
    setIsOpen(false);
  };

  useEffect(() => {
    if (step === 1 || step === 2) {
      setBtnLabel("Continue");
    }
    if (step === 3) {
      setBtnLabel("Report");
    }
    if (step === 4) {
      report();
      setBtnLabel("Close");
    }
    if (step === 5) {
      closeModal();
    }
  }, [step]);

  return {
    isOpen,
    step,
    listTokenFilter,
    btnLabel,
    selectedToken,
    reportContentList,
    checkedContent,
    onSearchValueChange,
    onSelectTokenToReport,
    handleCheckClick,
    onChangeReportDescription,
    nextStep,
    openModal,
    closeModal,
  };
};

export default useReportFacade;
