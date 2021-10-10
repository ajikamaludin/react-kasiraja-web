import { useEffect, useState } from "react";
import { 
  FormControl, 
  FormLabel, 
  Input, 
  Box, 
  InputGroup, 
  InputRightElement, 
  InputRightAddon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker"
import NumberFormat from "react-number-format";
import { formatDate } from "../../utils";

export function FormDatePicker(props) {
  const { data: [name, date = (new Date()), setDate = () => {}] } = props
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Popover
      isOpen={isOpen}
    >
      <FormLabel fontWeight="bold">{name}</FormLabel>
      <PopoverTrigger>
        
        <InputGroup>
          <Input 
            value={formatDate(date)}
            bg="gray.200" 
            readOnly={true} 
            focusBorderColor="red.500"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          />
          <InputRightElement children={<FontAwesomeIcon icon="calendar-alt" />} />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent bg="transparent" border="none" maxW="min-content">
        <PopoverBody maxW="fit-content" p="0" minW="0rem">
          <DatePicker 
            style={{padding: "none"}}
            selected={date}
            onChange={(date) => {
              setDate(date)
              setIsOpen(!isOpen)
            }}
            inline />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export function SearchInput({ setter: [search, setSearch], ...restProps }) {
  return (
    <Box {...restProps}>
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
  const [show, setShow] = useState(false)
  const { data: [name, val, setVal = () => {}, type = "text"]} = props
  return (
    <FormControl id={name} mb="3">
      <FormLabel fontWeight="bold">{name}</FormLabel>
      <InputGroup size="md">
        <Input 
          focusBorderColor="red.500"
          type={!show ? type : "text"}
          value={val}
          onChange={e => setVal(e.target.value)}
          {...props}
        />
        {type === "password" && (
          <InputRightElement width="3.5rem">
            <Button h="1.25rem" size="sm" onClick={() => setShow(!show)} bg="transparent" color="black" _hover={{ bg: "transparent" }} _active={{ bg: "transparent"}}>
              {show ? <FontAwesomeIcon icon={"eye"}/> : <FontAwesomeIcon icon={"eye-slash"}/>}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  )
}

export function FormInputSelection(props) {
  const { data: [name, val], onRemove, onClick, ...restProps } = props
  return (
    <Box {...restProps}>
      <FormControl id={name}>
        <FormLabel fontWeight="bold">{name}</FormLabel>
        <InputGroup>
          <Input 
            focusBorderColor="red.500"
            type={"text"}
            value={val}
            readOnly={true}
            bg={"gray.100"}
            onClick={onClick}
            {...restProps}
          />
          {onRemove && val ? 
            (
              <InputRightAddon
                children={<FontAwesomeIcon icon="times"/>} 
                onClick={onRemove}
              />
            ) : ( 
              <InputRightAddon
                children={<FontAwesomeIcon icon="ellipsis-v" />}
                onClick={onClick}
              /> 
            )
          }
        </InputGroup>
      </FormControl>
    </Box>
  )
}

export function FormInputSelectionOpen(props) {
  const { data: [name, val = "", setVal = () => {}], onRemove, onClick, ...restProps } = props
  return (
    <Box {...restProps}>
      <FormControl id={name}>
        <FormLabel fontWeight="bold">{name}</FormLabel>
        <InputGroup>
          <Input 
            focusBorderColor="red.500"
            type={"text"}
            value={val}
            onChange={e => setVal(e.target.value)}
            bg={"gray.100"}
            onDoubleClick={onClick}
            {...restProps}
          />
          <InputRightAddon
            children={<FontAwesomeIcon icon="search" />}
            onClick={onClick}
          />
        </InputGroup>
      </FormControl>
    </Box>
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

export function InputNumber(props) {
  return (
    <NumberFormat
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      allowLeadingZeros={false}
      style={{textAlign: "right"}}
      focusBorderColor="red.500"
      {...props}
    />
  )
}