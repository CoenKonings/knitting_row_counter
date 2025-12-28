import React from "react";

interface TextInputProps {
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange(value: string): void;
}

interface Option {
  value: string;
  text: string;
}

interface SelectInputProps {
  name: string;
  id: string;
  placeholder: Option;
  value: string;
  onChange(value: string): void;
  options: Option[];
  renderElement: boolean;
}

export function TextInput({ name, id, placeholder, value, onChange }: TextInputProps) {
  return <>
    <input
      type="text"
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  </>
}

export function SelectInput({ name, id, placeholder, value, onChange, options, renderElement }: SelectInputProps) {
  if (!renderElement ) {
    return;
  }

  const optionElements = options.map((option, index) => (
    <option value={option.value} key={`${name}-option-${index}`}>
      {option.text}
    </option>
  ));

  if (placeholder) {
    optionElements.unshift(
      <option value={placeholder.value} disabled key={`${name}-placeholder`}>
        {placeholder.text}
      </option>
    );
  }

  return <>
    <select
      name={name}
      id={id}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      {optionElements}
    </select>
  </>
}
