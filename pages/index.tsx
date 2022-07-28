import { useAppDispatch, useAppSelector } from "@/app/hooks";
import FormField from "@/components/FormField";
import { FieldType, showAddFieldModal } from "@/app/formSlice";
import React, { useCallback } from "react";
import { Menu } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);

  const addFormFieldsHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const name = e.currentTarget.name as FieldType;
      dispatch(showAddFieldModal(name));
    },
    []
  );

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Form Generator
      </h1>
      <Menu
        as={motion.div}
        className="relative mt-20 flex items-center justify-end"
      >
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center flex-nowrap space-x-2  px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition">
              <span>Add Field</span>
              <FaPlus />
            </Menu.Button>
            <Menu.Items
              static
              as={motion.div}
              className="absolute top-full right-0 w-full max-w-xs flex flex-col p-2 rounded bg-white shadow"
              animate={open ? "open" : "close"}
              variants={{
                open: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  visibility: "visible",
                },
                close: {
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                  visibility: "hidden",
                },
              }}
              transition={{
                duration: 0.15,
                ease: "easeInOut",
              }}
            >
              <Menu.Item as="div">
                <button
                  className="focus:outline-none block w-full text-left hover:bg-gray-50 transition px-4 py-2"
                  name="input"
                  onClick={addFormFieldsHandler}
                >
                  Input
                </button>
              </Menu.Item>
              <Menu.Item as="div">
                <button
                  className="focus:outline-none block w-full text-left hover:bg-gray-50 transition px-4 py-2"
                  name="checkbox"
                  onClick={addFormFieldsHandler}
                >
                  Checkbox
                </button>
              </Menu.Item>
              <Menu.Item as="div">
                <button
                  className="focus:outline-none block w-full text-left hover:bg-gray-50 transition px-4 py-2"
                  name="select"
                  onClick={addFormFieldsHandler}
                >
                  Select
                </button>
              </Menu.Item>
              <Menu.Item as="div">
                <button
                  className="focus:outline-none block w-full text-left hover:bg-gray-50 transition px-4 py-2"
                  name="textarea"
                  onClick={addFormFieldsHandler}
                >
                  Textarea
                </button>
              </Menu.Item>
            </Menu.Items>
          </>
        )}
      </Menu>
      <h2 className="mt-20 text-2xl font-semibold max-w-sm mx-auto">Form</h2>
      <div className="mt-20 flex flex-col max-w-sm mx-auto space-y-4">
        {form.fields.map((props) => {
          return (
            <FormField key={`${props.fieldType}-${props.id}`} {...props} />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
