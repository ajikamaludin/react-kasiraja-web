import { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Box, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NumberFormat from "react-number-format";

export function SearchInput({ setter: [search, setSearch] }) {
  return (
    <Box px="3" mt="6">
      <InputGroup>
        <Input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="cari"
          focusBorderColor="red.500"
        />
        <InputRightElement children={<FontAwesomeIcon icon="search" />} />
      </InputGroup>
    </Box>
  )
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
}

export function FormInput(props) {
  const { data: [name, val, setVal = () => {}, type = "text"]} = props
  return (
    <FormControl id={name} mb="3">
      <FormLabel fontWeight="bold">{name}</FormLabel>
      <Input 
        focusBorderColor="red.500"
        type={type}
        value={val}
        onChange={e => setVal(e.target.value)}
        {...props}
      />
    </FormControl>
  )
}

export function FormInputNumber(props) {
  const { data:[name, val, setVal] } = props
  return (
    <FormControl id={name} mb="3">
      <FormLabel fontWeight="bold">{name}</FormLabel>
      <NumberFormat
        customInput={Input}
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        allowLeadingZeros={false}
        style={{textAlign: "right"}}
        value={val}
        onValueChange={e => setVal(e.value)}
        focusBorderColor="red.500"
        {...props}
      />
    </FormControl>
  )
}