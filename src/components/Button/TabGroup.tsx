import { Box, Button, HStack, Text } from "@chakra-ui/react";
import {FunctionComponent} from 'react'
type TabProps = {
  items : Array<any>
  onClick : (n: string) => void
  current : String
}
export const TabGroup : FunctionComponent<TabProps>=({ items, onClick: OnTapTab, current })=>(
    <Box>
      <HStack direction="row" justify="space-between" backgroundColor="gray.800" paddingX="100" paddingY="2">
        {items.map((item) => (
          <Box onClick={()=>OnTapTab(item.name)} cursor='pointer'  key={item.name} borderBottomWidth="3" borderBottomColor={current === item.name ? "blue" : "transparent"}>
            <Text color={current === item.name ? "blue" : "white"}>{item.name}</Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
