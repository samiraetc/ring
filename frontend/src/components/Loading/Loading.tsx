import { Box, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box p={8} textAlign="center">
      <Spinner size="xl" />
      <Text mt={4}>Loading users...</Text>
    </Box>
  );
};

export default Loading;
