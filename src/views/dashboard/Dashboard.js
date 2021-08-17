import {
  Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow
} from "@chakra-ui/react"
import Card from "../../components/Common/Card"

export default function Dashboard() {
  return (
    <Flex direction="column">
      <Flex flexShrink="revert" direction="row" justifyContent="flex-start">
        <Card>
          <Stat>
            <StatLabel>Penjualan</StatLabel>
            <StatNumber>345.670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36% from yesterday
            </StatHelpText>
          </Stat>
        </Card>
        <Card>
          <Stat>
            <StatLabel>Pembelian</StatLabel>
            <StatNumber>145.670</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              3.36% from yesterday
            </StatHelpText>
          </Stat>
        </Card>
      </Flex>
    </Flex>
  )
}