import {
  Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow
} from "@chakra-ui/react"
import { useEffect } from "react"
import Card from "../../components/Common/Card"
import { useAuth } from "../../context/AppContext"

export default function Dashboard(props) {
  const { user } = useAuth()
  
  useEffect(() => {
    const { role } = user
    if(role === "kasir") {
      props.history.push("/sales/create")
    }
    return () => {}
  }, [user, props])

  return (
    <Flex direction="column">
      <Flex flexShrink="revert" direction="row" justifyContent="flex-start">
        <Card>
          <Stat>
            <StatLabel>{user.name}</StatLabel>
            <StatNumber>hai</StatNumber>
          </Stat>
        </Card>
        {user.role === "admin" && (
        <>
          <Card>
            <Stat>
              <StatLabel>penjualan</StatLabel>
              <StatNumber>345.670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36% from yesterday
              </StatHelpText>
            </Stat>
          </Card>
          <Card>
            <Stat>
              <StatLabel>pembelian</StatLabel>
              <StatNumber>145.670</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                3.36% from yesterday
              </StatHelpText>
            </Stat>
          </Card>
        </>
        )}
      </Flex>
    </Flex>
  )
}