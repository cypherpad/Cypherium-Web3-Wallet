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
  import QRImage from 'react-qr-image'
  import React, { FunctionComponent } from "react";
  type QrCodeImageModalProps = {
    address: string;
    isOpen: boolean;
    onClose: () => void;
  };
  export const QrCodeImageModal: FunctionComponent<QrCodeImageModalProps> =
    ({ address, isOpen, onClose }) => (
      <Modal
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Scan This Image</Text>
          </ModalHeader>
          <ModalBody>
            <VStack align={"center"} justify={"center"}>
              <QRImage text={address} color="white" background="#111"></QRImage>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(evt)=>onClose()}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  