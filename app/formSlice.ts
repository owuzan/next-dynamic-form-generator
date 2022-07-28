import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckboxProps } from "ui/Checkbox";
import { InputProps } from "ui/Input";
import { SelectProps } from "ui/Select";
import { TextareaProps } from "ui/Textarea";

export type FieldType = "input" | "checkbox" | "textarea" | "select";

export interface EmptyField {
  fieldType: FieldType;
}

interface InputField extends InputProps {
  fieldType: "input";
}
interface CheckboxField extends CheckboxProps {
  fieldType: "checkbox";
}
interface TextareaField extends TextareaProps {
  fieldType: "textarea";
}
interface SelectField extends SelectProps {
  fieldType: "select";
}

export type Field = InputField | CheckboxField | TextareaField | SelectField;

export type FormState = {
  fields: Field[];
  showModals: {
    [key in FieldType]: boolean;
  };
};
const initialState: FormState = {
  fields: [],
  showModals: {
    input: false,
    checkbox: false,
    textarea: false,
    select: false,
  },
};

const formState = createSlice({
  initialState,
  name: "form",
  reducers: {
    addField: (state: FormState, action: PayloadAction<Field>) => {
      state.fields.push(action.payload);
    },
    showAddFieldModal: (state: FormState, action: PayloadAction<FieldType>) => {
      const fieldType = action.payload;
      state.showModals[fieldType] = true;
    },
    closeAddFieldModals: (state: FormState) => {
      state.showModals = initialState.showModals;
    },
  },
});

export const { addField, showAddFieldModal, closeAddFieldModals } =
  formState.actions;
export default formState.reducer;
