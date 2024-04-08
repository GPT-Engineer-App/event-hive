import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Stack, Grid, GridItem, IconButton, useDisclosure } from "@chakra-ui/react";
import EventModal from "../components/EventModal";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/events");
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
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
      <Text fontSize="xl" mb={4}>
        Welcome to our events site!
      </Text>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddEvent}>
        Add Event
      </Button>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
        {events.map((event) => (
          <GridItem key={event.id} borderWidth={1} borderRadius="md" p={4}>
            <Heading as="h2" size="md" mb={2}>
              {event.attributes.Name}
            </Heading>
            <Text>
              <strong>Description:</strong> {event.attributes.Description}
            </Text>
            <Text>
              <strong>Date:</strong> {new Date(event.attributes.createdAt).toLocaleDateString()}
            </Text>
            <Stack direction="row" mt={4}>
              <IconButton icon={<FaEdit />} aria-label="Edit Event" onClick={() => handleEditEvent(event)} />
              <IconButton icon={<FaTrash />} aria-label="Delete Event" onClick={() => handleDeleteEvent(event.id)} />
            </Stack>
          </GridItem>
        ))}
      </Grid>
      <EventModal isOpen={isOpen} onClose={onClose} selectedEvent={selectedEvent} title={title} setTitle={setTitle} location={location} setLocation={setLocation} date={date} setDate={setDate} handleSaveEvent={handleSaveEvent} />
    </Box>
  );
};

export default Index;
