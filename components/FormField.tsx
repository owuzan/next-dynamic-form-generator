import { Field, FieldType } from "@/app/formSlice";
import React from "react";
import Checkbox from "ui/Checkbox";
import Input from "ui/Input";
import Select from "ui/Select";
import Textarea from "ui/Textarea";

type Props = Field;
const FormField = (propsWithFieldType: Props) => {
  const { fieldType, ...props } = propsWithFieldType;

  const Components: Record<FieldType, any> = {
    input: Input,
    checkbox: Checkbox,
    textarea: Textarea,
    select: Select,
  };

  const Component = Components[fieldType];

  return <Component {...props} />;
};

export default FormField;
