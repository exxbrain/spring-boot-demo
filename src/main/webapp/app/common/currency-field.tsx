import React from "react"
import NumberFormat from 'react-number-format';
import {InputAdornment, TextField, TextFieldProps} from "@material-ui/core";

interface Event {
  target: { name: string, value: string };
}

interface MoneyFormatProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: Event) => void;
  name: string;
}

const createEvent = (name: string, value: string): Event  => {
  return {
    target: {
      name,
      value,
    }
  }
};

const MoneyFormat = (
  { inputRef,
    onChange,
    name,
    ...other
  }: MoneyFormatProps ): JSX.Element => {
  // const [currentValue, setCurrentValue] = useState(value);
  return (
    <NumberFormat
      {...other}
      name={name}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange(createEvent(name, values.value));
      }}
      style={{
        textAlign: "right"
      }}
      thousandSeparator=" "
      isNumericString
      decimalScale={2}
    />
  );
};

export const CurrencyField = (
  {
    value,
    ...other
  }: TextFieldProps): JSX.Element => (
  <TextField
    {...other}
    value={(value as any).toString()}
    InputProps={{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputComponent: MoneyFormat as any,
      endAdornment: <InputAdornment position="end">₽</InputAdornment>
    }}
  />
);
