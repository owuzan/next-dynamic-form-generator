import { useAppSelector } from "@/app/hooks";
import React from "react";
import AddCheckboxModal from "./Modals/AddCheckboxModal";
import AddInputModal from "./Modals/AddInputModal";
import AddSelectModal from "./Modals/AddSelectModal";
import AddTextareaModal from "./Modals/AddTextareaModal";

type Props = {
  children?: React.ReactNode;
};
const AppWrapper = ({ children }: Props) => {
  const addFieldsModals = useAppSelector((state) => state.form.showModals);
  return (
    <div>
      {addFieldsModals.input && <AddInputModal />}
      {addFieldsModals.checkbox && <AddCheckboxModal />}
      {addFieldsModals.textarea && <AddTextareaModal />}
      {addFieldsModals.select && <AddSelectModal />}
      {children}
    </div>
  );
};

export default AppWrapper;
