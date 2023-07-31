import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    ModalFooter,
    Button,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { FunctionComponent } from "react";
  type TransactionFailureModalProps = {
    message: string;
    isOpen: boolean;
    onClose: () => void;
  };
  export const TransactionFailureModal: FunctionComponent<TransactionFailureModalProps> =
    ({ message, isOpen, onClose }) => (
      <Modal
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Notification</Text>
          </ModalHeader>
          <ModalBody>
            <VStack>
              <Text color={"red"}>{message}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(evt)=>onClose()}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  