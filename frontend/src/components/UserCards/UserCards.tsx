import {
  Box,
  Text,
  Avatar,
  HStack,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import { BiSolidStar } from "react-icons/bi";
import { AVATAR_RING } from "@/themes/avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/user/userSlice";
import EditUserModal from "../EditUserModal/EditUserModal";

interface UserCardsProps {
  user: User;
}

const UserCards = ({ user }: UserCardsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedUser(user));
    navigate(`/user/${user.id}`);
  };

  return (
    <Box
      key={user.id}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      p={4}
      bg="white"
      width="md"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="220px"
    >
      <Box flex="1">
        <HStack align="self-start" spaceX="2">
          <Avatar.Root css={AVATAR_RING} colorPalette="pink" mt={1} size="2xl">
            <Avatar.Fallback name="Random" />
            <Avatar.Image
              src={`https://randomuser.me/api/portraits/women/${user.id}.jpg`}
            />
          </Avatar.Root>

          <Box spaceY="0.5" w="full">
            <Flex align="center" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {user.name}
                </Text>
                <Box
                  display="flex"
                  gap="1"
                  alignItems="center"
                  color="gray.600"
                >
                  <GrLocation />
                  <Text fontWeight="normal" fontSize="sm" color="gray.600">
                    {user.region}
                  </Text>
                </Box>
              </Box>
              <EditUserModal user={user} />
            </Flex>

            <Box display="flex" alignItems="center" gap="1">
              <Text
                fontSize="sm"
                fontWeight="bold"
                color="orange.500"
                mt={1}
                display="flex"
                alignItems="center"
                gap="1"
              >
                <BiSolidStar size="17" /> {user.averageRating}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={1}>
                ({user.totalReviews} reviews)
              </Text>
            </Box>
          </Box>
        </HStack>

        <Box
          fontSize="sm"
          color="gray.600"
          display="flex"
          gap="1"
          flexWrap="wrap"
          pt={2}
        >
          {user.services.slice(0, 5).map((service: Service) => (
            <Badge
              key={service.id}
              padding="1.5"
              rounded="lg"
              paddingX="4"
              colorScheme="teal"
            >
              {service.name}
            </Badge>
          ))}
          {user.services.length > 5 && (
            <Badge padding="1.5" rounded="lg" paddingX="4" colorScheme="gray">
              {user.services.length - 5} more
            </Badge>
          )}
        </Box>
      </Box>

      <Button
        size="xs"
        mt={4}
        w="full"
        colorScheme="teal"
        onClick={handleClick}
      >
        Open profile
      </Button>
    </Box>
  );
};

export default UserCards;
