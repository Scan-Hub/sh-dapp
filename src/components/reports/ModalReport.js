import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { reports } from "../../assets";
import ReportFirstStep from "./ReportFirstStep";
import ReportSuccess from "./ReportSuccess";
import ReportSecondStep from "./ReportSecondStep";
import ReportThirdStep from "./ReportThirdStep";
import useReportFacade from "./useReportFacade";
import { CSSTransition } from "react-transition-group";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(97.6deg, #181F2D 0.41%, #181427 101.99%)",
    width: "460px",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#modalReport');

const ModalReport = () => {
  const {
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
  } = useReportFacade();

  return (
    <div className="flex items-start relative">
      <CSSTransition
        in={true}
        timeout={500}
        // classNames="menu-mobile"
        unmountOnExit
      >
        <button
          className="cssanimation doorCloseFromRight duration-[5000] w-full bg-[#00AF71] text-white p-[12px_24px] rounded-[32px] mt-15 whitespace-nowrap"
          onClick={openModal}
        >
          Go To Report
        </button>
      </CSSTransition>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal-sh p-8 flex flex-col rounded-2xl"
        overlayClassName="sh-modal-overlay"
      >
        <div className="flex flex-row items-center">
          <h2 className="w-full text-align text-center text-xl font-bold">
            Report Token
          </h2>
          <img
            alt="Close"
            src={reports.IcCLose}
            className="cursor-pointer items-end"
            onClick={closeModal}
          />
        </div>

        <div className="h-[1px] w-full bg-[#343247] my-8"></div>

        {/* STEP1: select token to report */}
        {step === 1 && (
          <ReportFirstStep
            listTokenFilter={listTokenFilter}
            onSearchValueChange={onSearchValueChange}
            onSelectTokenToReport={onSelectTokenToReport}
          />
        )}

        {/* STEP2, STEP3, STEP4 */}
        {(step === 2 || step === 3 || step === 4) && (
          <div className="flex flex-col space-y-8">
            {(step === 2 || step === 3) && (
              <div className="flex flex-row space-x-4 bg-[#7C7BF5] p-2 rounded-lg">
                <img alt="Symbol" src={selectedToken?.iconSymbol} />
                <div className="flex flex-col space-y-[2px]">
                  <span className="font-montserrat_bold text-base text-white">
                    {selectedToken?.title}
                  </span>
                  <span className="font-montserrat text-sm text-white">
                    {selectedToken?.tokenName}
                  </span>
                </div>
              </div>
            )}

            {/* STEP2: check the content want to report */}
            {step === 2 && (
              <ReportSecondStep
                reportContentList={reportContentList}
                handleCheckClick={handleCheckClick}
              />
            )}

            {/* STEP3: write description and confirm report */}
            {step === 3 && (
              <ReportThirdStep
                checkedContent={checkedContent}
                onChangeReportDescription={onChangeReportDescription}
              />
            )}

            {/* STEP4:  */}
            {step === 4 && <ReportSuccess />}

            <button
              className={`p-[6px_16px] rounded-[32px] ${
                checkedContent.length > 0
                  ? "bg-[#00AF71] text-white"
                  : "bg-[#595959] text-[#8C8C8C]"
              } `}
              disabled={checkedContent.length === 0}
              onClick={nextStep}
            >
              {btnLabel}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalReport;
