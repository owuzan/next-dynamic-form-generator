import { addField, closeAddFieldModals } from "@/app/formSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { useCallback, useEffect } from "react";
import Input from "ui/Input";
import Modal from "ui/Modal";
import ModalLayout from "./ModalLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlus, FaTimes } from "react-icons/fa";
import Checkbox from "ui/Checkbox";
import { CgClose } from "react-icons/cg";
import { nanoid } from "nanoid";

const AddSelectModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.form.showModals.select);

  const closeModalHandler = useCallback(() => {
    dispatch(closeAddFieldModals());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      label: "",
      defaultValue: "",
      required: false,
      options: [],
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
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
          fieldType: "select",
          ...values,
        })
      );
      closeModalHandler();
      formikHelpers.resetForm();
    },
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

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
      size="md"
      hiddenCloseButton
    >
      <button
        className="p-4 bg-red-500 hover:bg-red-600 rounded-tr-2xl rounded-bl-2xl text-white inline-flex items-center justify-center absolute right-0 top-0 focus:outline-none transition"
        onClick={closeModalHandler}
      >
        <FaTimes />
      </button>
      <ModalLayout
        title="Add Select"
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
          <div className="col-span-full">
            <div className="flex flex-col space-y-4">
              {formik.values.options.map((option, index) => {
                return (
                  <div key={index} className="grid grid-cols-12 gap-4">
                    <div className="col-span-1 inline-flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="col-span-3">
                      <Input
                        id={`option-value-${index}`}
                        label="Value"
                        name={`options[${index}].value`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={option.value}
                        errors={fieldErrors(`options[${index}].value`)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        id={`option-text-${index}`}
                        label="Text"
                        name={`options[${index}].children`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={option.children}
                        errors={fieldErrors(`options[${index}].children`)}
                      />
                    </div>
                    <div className="col-span-2 mt-5">
                      <Checkbox
                        id={`options[${index}].hidden`}
                        name={`options[${index}].hidden`}
                        label=""
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={option.hidden}
                        errors={fieldErrors(`options[${index}].hidden`)}
                      >
                        Hidden
                      </Checkbox>
                    </div>
                    <div className="col-span-2 mt-5">
                      <Checkbox
                        id={`options[${index}].checked`}
                        name={`options[${index}].checked`}
                        label=""
                        onChange={(e) => {
                          if (!option.checked) {
                            if (formik.values.options.some((o) => o.checked)) {
                              const newOptions = formik.values.options.map(
                                (o) => {
                                  o.checked = false;
                                  return o;
                                }
                              );
                              formik.setFieldValue("options", newOptions);
                            }
                          }
                          formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        checked={option.checked}
                        errors={fieldErrors(`options[${index}].checked`)}
                      >
                        Checked
                      </Checkbox>
                    </div>
                    <div className="col-span-1 mt-5 inline-flex">
                      {formik.values.options.length > 1 || true ? (
                        <button
                          type="button"
                          className="inline-flex ml-auto items-center justify-center w-8 h-8 rounded-full text-red-500 bg-red-100"
                          onClick={() => {
                            const newOptions = formik.values.options.filter(
                              (o) => o.id !== option.id
                            );
                            formik.setFieldValue("options", newOptions);
                          }}
                        >
                          <CgClose />
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white"
                onClick={() => {
                  const newOption = {
                    id: nanoid(),
                    children: "",
                    text: "",
                    value: "",
                    hidden: false,
                    checked: false,
                  };
                  formik.setFieldValue("options", [
                    ...formik.values.options,
                    newOption,
                  ]);
                }}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </form>
      </ModalLayout>
    </Modal>
  );
};

export default AddSelectModal;
