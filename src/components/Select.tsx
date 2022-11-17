import Select from 'react-select';

interface SelectProps {
  value: string;
  label: string;
}

interface Props {
  options: SelectProps[];
  setValue: any;
  value: SelectProps[];
  placeholder: string;
}
export default function ({ options, value, setValue, placeholder }: Props) {
  return (
    <Select
      isMulti
      placeholder={placeholder}
      options={options}
      value={value}
      styles={{
        container: (baseStyle) => ({
          ...baseStyle,
          zIndex: '50',
        }),
        control: (baseStyle, state) => ({
          ...baseStyle,
          height: '44px',
          borderColor: 'grey',
        }),
        valueContainer: (baseStyle) => ({
          ...baseStyle,
          paddingRight: '32px',
        }),
      }}
      onChange={(value) => setValue(value)}
    />
  );
}
