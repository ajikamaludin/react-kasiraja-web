import { 
  Box, Flex, Input, InputGroup, InputRightElement, Popover, 
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker"
import { useState } from "react"
import { formatDate } from "../../utils"

export function useDatePickerFilter() {
  const date = new Date()

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000))))

  return [
    startDate,
    endDate,
    { 
      setStartDate,
      setEndDate 
    }
  ]
}

export function DatePickerFilter({ startDate, endDate, setter : { setStartDate, setEndDate }, ...restProps }) {

  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  return (
    <Flex direction={{base: "column", md: "row"}} mt="5" mb="1" gridGap="2" {...restProps}>
        <Box flexDirection="column" flex="1">
          <Popover
            isOpen={startDateOpen}
          >
            <PopoverTrigger>
              <InputGroup>
                <Input 
                  value={formatDate(startDate)}
                  bg="gray.200" 
                  readOnly={true} 
                  focusBorderColor="red.500"
                  onClick={() => {
                    setStartDateOpen(!startDateOpen)
                    setEndDateOpen(false)
                  }}
                />
                <InputRightElement children={<FontAwesomeIcon icon="calendar-alt" />} />
              </InputGroup>
            </PopoverTrigger>
            <PopoverContent bg="transparent" border="none" maxW="min-content">
              <PopoverBody maxW="fit-content" p="0" minW="0rem">
                <DatePicker 
                  style={{padding: "none"}}
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date)
                    if(date > endDate) {
                      setEndDate(date)
                    }
                    setStartDateOpen(!startDateOpen)
                  }}
                  inline />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Box flexDirection="column" flex="1">
          <Popover
            isOpen={endDateOpen}
          >
            <PopoverTrigger>
              <InputGroup>
                <Input 
                  value={formatDate(endDate)}
                  bg="gray.200" 
                  readOnly={true} 
                  focusBorderColor="red.500"
                  onClick={() => {
                    setEndDateOpen(!endDateOpen)
                    setStartDateOpen(false)
                  }}
                />
                <InputRightElement children={<FontAwesomeIcon icon="calendar-alt" />} />
              </InputGroup>
            </PopoverTrigger>
          <PopoverContent bg="transparent" border="none" maxW="min-content">
            <PopoverBody maxW="fit-content" p="0" minW="0rem">
              <DatePicker
                minDate={startDate}
                selected={endDate} 
                onChange={(date) => {
                  setEndDate(date)
                  setEndDateOpen(!endDateOpen)}
                }
                inline
              />
            </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
  )
}