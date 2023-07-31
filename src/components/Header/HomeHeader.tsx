import { Box, HStack, Text, Icon, Link, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { RiMenuFill } from "react-icons/ri";
export const HomeHeader = ({ wallet, openSetting }) => {
  const [toolTipOpen, setTooltipOpen] = useState(false);
  return (
    <Box height="39" bgColor="gray.800">
      <HStack justifyContent="space-between">
        <Link cursor="pointer" onClick={openSetting}>
          <Icon as={RiMenuFill} fontSize="7vh" paddingLeft="3vh"></Icon>
        </Link>
        <HStack justifyContent="center" align="center" py="2">
          <Text>{wallet.name}</Text>

          <Tooltip isOpen={toolTipOpen} label="Copied" >
            <Text
              cursor={"pointer"}
              onClick={(e) => {
                setTooltipOpen(true);
                navigator.clipboard.writeText(wallet.address);
                setTimeout(() => {
                  setTooltipOpen(false);
                }, 1000);
              }}
            >
              ({wallet.address.toString().substr(0, 10).toLowerCase()}...)
            </Text>
          </Tooltip>
        </HStack>
        <Box></Box>
      </HStack>
    </Box>
  );
};
