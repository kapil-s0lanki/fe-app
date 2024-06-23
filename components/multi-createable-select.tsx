import React from "react";

import CreatableSelect from "react-select/creatable";

interface SelectProps {
  prefix?: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const MultiCreatableSelect = ({
  value,
  onChange,
  options,
  disabled,
  prefix,
}: SelectProps) => {
  return (
    <CreatableSelect
      value={value}
      onChange={onChange}
      isMulti
      options={options}
      isDisabled={disabled}
      isLoading={disabled}
      isClearable={true}
      isSearchable={true}
      className="min-h-8 text-sm"
      placeholder=""
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
      classNamePrefix={prefix || "Select contacts to add"}
    />
  );
};

export default MultiCreatableSelect;
