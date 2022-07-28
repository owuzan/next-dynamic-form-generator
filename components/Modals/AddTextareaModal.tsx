import { addField, closeAddFieldModals } from "@/app/formSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { useCallback } from "react";
import Input from "ui/Input";
import Modal from "ui/Modal";
import Select from "ui/Select";
import ModalLayout from "./ModalLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";
import Checkbox from "ui/Checkbox";

const AddTextareaModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.form.showModals.textarea);

  const closeModalHandler = useCallback(() => {
    dispatch(closeAddFieldModals());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      placeholder: "",
      minLength: 0,
      maxLength: 0,
      id: "",
      label: "",
      defaultValue: "",
      required: false,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      placeholder: yup.string(),
      minLength: yup.number(),
      maxLength: yup.number(),
      id: yup.string().required("ID is required"),
      label: yup.string().required("Label is required"),
      defaultValue: yup.string(),
      required: yup.boolean(),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit(values, formikHelpers) {
      dispatch(
        addField({
          fieldType: "textarea",
          ...values,
        })
      );
      closeModalHandler();
      formikHelpers.resetForm();
    },
  });

  const fieldErrors = useCallback(
    (fieldName: string): string[] => {
      if (formik.touched[fieldName] && formik.errors[fieldName]) {
        return [formik.errors[fieldName]];
      }
      return [];
    },
    [formik.touched, formik.errors]
  );

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Modal
      close={closeModalHandler}
      isOpen={isOpen}
      size="sm"
      hiddenCloseButton
    >
      <button
        className="p-4 bg-red-500 hover:bg-red-600 rounded-tr-2xl rounded-bl-2xl text-white inline-flex items-center justify-center absolute right-0 top-0 focus:outline-none transition"
        onClick={closeModalHandler}
      >
        <FaTimes />
      </button>
      <ModalLayout
        title="Add Textarea"
        onSubmit={handleSubmit}
        onCancel={closeModalHandler}
      >
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            id="label"
            name="label"
            label="Label"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.label}
            errors={fieldErrors("label")}
            required
          />
          <Input
            id="placeholder"
            name="placeholder"
            label="Placeholder"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.placeholder}
            errors={fieldErrors("placeholder")}
          />
          <Input
            id="id"
            name="id"
            label="Id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            errors={fieldErrors("id")}
            required
          />
          <Input
            id="name"
            name="name"
            label="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            errors={fieldErrors("name")}
            required
          />
          <Input
            type="number"
            id="minLength"
            name="minLength"
            label="Min. Length"
            inputMode="numeric"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.minLength}
            errors={fieldErrors("minLength")}
          />
          <Input
            type="number"
            id="maxLength"
            name="maxLength"
            label="Max. Length"
            inputMode="numeric"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.maxLength}
            errors={fieldErrors("maxLength")}
          />
          <Input
            type="text"
            id="defaultValue"
            name="defaultValue"
            label="Default Value"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.defaultValue}
            errors={fieldErrors("defaultValue")}
          />
          <Checkbox
            id="required"
            name="required"
            label="Required"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.required}
            errors={fieldErrors("required")}
          >
            Is Required?
          </Checkbox>
        </form>
      </ModalLayout>
    </Modal>
  );
};

export default AddTextareaModal;
