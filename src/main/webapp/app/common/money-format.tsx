import React from "react"
import NumberFormat from 'react-number-format';

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

export const MoneyFormat = (
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
      suffix=" ₽"
    />
  );
};
