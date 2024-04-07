import React, { useState } from "react";
import { Box, Heading, Text, Button, Input, Stack, Grid, GridItem, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setTitle("");
    setLocation("");
    setDate("");
    onOpen();
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setLocation(event.location);
    setDate(event.date);
    onOpen();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      // Edit existing event
      const updatedEvents = events.map((event) => (event.id === selectedEvent.id ? { ...event, title, location, date } : event));
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        id: Date.now(),
        title,
        location,
        date,
      };
      setEvents([...events, newEvent]);
    }
    onClose();
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Events Website
      </Heading>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddEvent}>
        Add Event
      </Button>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
        {events.map((event) => (
          <GridItem key={event.id} borderWidth={1} borderRadius="md" p={4}>
            <Heading as="h2" size="md" mb={2}>
              {event.title}
            </Heading>
            <Text>
              <strong>Location:</strong> {event.location}
            </Text>
            <Text>
              <strong>Date:</strong> {event.date}
            </Text>
            <Stack direction="row" mt={4}>
              <IconButton icon={<FaEdit />} aria-label="Edit Event" onClick={() => handleEditEvent(event)} />
              <IconButton icon={<FaTrash />} aria-label="Delete Event" onClick={() => handleDeleteEvent(event.id)} />
            </Stack>
          </GridItem>
        ))}
      </Grid>
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
    </Box>
  );
};

export default Index;
