import React from "react";
import { FormField, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";
import { authFormSchema } from "@/lib/utils";
declare interface CustomInputProps {
  control: Control<z.infer<typeof authFormSchema>>;
  label: string;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  placeholder: string;
  type?: string;
}

const CustomInput = ({
  control,
  label,
  name,
  placeholder,
  type,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type ? type : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
