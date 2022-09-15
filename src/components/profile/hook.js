import { useState } from "react";

const useProfileFacade = () => {
  const [showModalVerify, setShowModalVerify] = useState(false);
  const onOpenModal = () => {
    setShowModalVerify(true);
  };
  const onCloseModal = () => {
    setShowModalVerify(false);
  };
  return { showModalVerify, onOpenModal, onCloseModal };
};

export default useProfileFacade;
