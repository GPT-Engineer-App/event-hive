import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const EventModal = ({ isOpen, onClose, selectedEvent, title, setTitle, location, setLocation, date, setDate, handleSaveEvent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedEvent ? "Edit Event" : "Add Event"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveEvent}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;