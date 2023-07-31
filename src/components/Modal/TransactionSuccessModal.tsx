import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  HStack,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import { FunctionComponent } from "react";
import { TransactionHistory } from "../../interface/wallet";
type TransactionSuccessModalProps = {
  tx: TransactionHistory;
  isOpen: boolean;
  onClose: () => void;
};
export const exampleTx : TransactionHistory = {
  token : {
    decimals : 18,
    name : "Cypherium",
    symbol : "CPH",
    totalSupply : BigNumber.from("10000000000000"),
    contractAddress:null,
    url : ""
  },
  fee: "-",
  status : "success",
  to : "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  txId : "0xsaxjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  value : "100000000000",
  from : "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
export const TransactionSuccessModal: FunctionComponent<TransactionSuccessModalProps> =
  ({ tx, isOpen, onClose }) => {
    var x = BigNumber.from(10).pow(BigNumber.from(tx.token.decimals));
    return (
      <Modal
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Transaction Success</Text>
          </ModalHeader>
          <ModalBody>
            <VStack align={'center'}>
              <Text>Sending {ethers.utils.formatEther(tx.value)} {tx.token.symbol} to : </Text>
              <Text>{tx.to}</Text>
              <Text>was success</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(evt)=>onClose()}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
