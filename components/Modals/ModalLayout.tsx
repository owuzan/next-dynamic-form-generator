import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onSubmit: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
};
const ModalLayout = ({ title, children, onSubmit, onCancel }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6">
      {title && (
        <h5 className="font-medium text-3xl text-gray-900 border-b border-gray-100 pb-4 mb-4">
          {title}
        </h5>
      )}
      <div className="text-gray-700">{children}</div>
      <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 mt-6 border-t border-gray-100 pt-6">
        <button
          type="button"
          className="rounded text-white bg-blue-500 hover:bg-blue-600 transition font-medium py-4 px-6"
          onClick={onSubmit}
        >
          Add
        </button>
        <button
          type="button"
          className="rounded text-white bg-red-500 hover:bg-red-600 transition font-medium py-4 px-6"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalLayout;
