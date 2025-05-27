import { Box, Text, Flex, Icon, Stack } from "@chakra-ui/react";
import { FaStar, FaCommentDots } from "react-icons/fa";
import { MdRepeat } from "react-icons/md";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <Box
      position="relative"
      w="full"
      maxW="md"
      mx="auto"
      pb={{ base: 20, md: 24 }}
    >
      <Box position="relative" borderRadius="lg" overflow="hidden">
        <img
          src={`https://randomuser.me/api/portraits/women/${user.id}.jpg`}
          alt="Foto de perfil"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Text
          position="absolute"
          bottom={20}
          left={5}
          color="white"
          fontSize="4xl"
          fontWeight="bold"
          textShadow="0 0 8px rgba(0,0,0,0.7)"
        >
          {user.name}
        </Text>
      </Box>

      <Box
        position="absolute"
        left="50%"
        bottom={16}
        transform="translateX(-50%)"
        w="90%"
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        px={6}
        py={5}
        zIndex={2}
      >
        <Flex justify="space-around" align="center">
          <Stack align="center" gap={0} minW={20}>
            <Flex align="center" gap={1}>
              <Icon as={FaStar} color="orange.400" boxSize={5} />
              <Text fontWeight="bold" fontSize="2xl">
                {user.averageRating}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              Note
            </Text>
          </Stack>

          <Box h={10} w="1px" bg="gray.200" mx={2} />

          <Stack align="center" gap={0} minW={20}>
            <Flex align="center" gap={1}>
              <Icon as={FaCommentDots} color="pink.400" boxSize={5} />
              <Text fontWeight="bold" fontSize="2xl">
                {user.totalReviews}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              Reviews
            </Text>
          </Stack>

          <Box h={10} w="1px" bg="gray.200" mx={2} />

          <Stack align="center" gap={0} minW={20}>
            <Flex align="center" gap={1}>
              <Icon as={MdRepeat} color="green.500" boxSize={5} />
              <Text fontWeight="bold" fontSize="2xl">
                6
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              Loyal customers
            </Text>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
