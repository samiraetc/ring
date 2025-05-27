import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Button,
  Fieldset,
  Field,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import StarRating from "@/components/Rating/Rating";
import type { RootState } from "@/redux/store";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import { GrLocation } from "react-icons/gr";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { addReviewToSelectedUser } from "@/redux/user/userSlice";
import MenuBar from "@/components/Menu/Menu";

const UserDetails = () => {
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.users.selectedUser
  ) as User | null;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const reviewMutation = useMutation({
    mutationFn: (data: { rating: number; comment: string }) =>
      api.post(`/users/${user?.id}/reviews`, data),
    onSuccess: (newReview) => {
      toaster.create({
        title: "Review sent!",
        type: "success",
        duration: 3000,
      });
      setRating(0);
      setComment("");

      queryClient.invalidateQueries({ queryKey: ["users"] });
      dispatch(addReviewToSelectedUser(newReview.data));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toaster.create({
        title: "Error sending review",
        description: error?.response?.data?.error || "Please try again",
        type: "error",
        duration: 4000,
      });
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <MenuBar />
      <Flex gap={4} paddingLeft="32" paddingTop="4">
        <Box flex="1" textAlign="center" maxWidth="35%">
          <ProfileHeader user={user} />
        </Box>

        <Box flex="1" maxWidth="50%">
          <Heading size="3xl" mb={2} fontWeight="extrabold">
            Do you have a service to request?
          </Heading>

          <Heading size="md" mt={2} mb={1}>
            Location
          </Heading>

          <Flex gap="1" alignItems="center" color="gray.600" mb={4}>
            <GrLocation />
            <Text fontWeight="normal" fontSize="sm" color="gray.600">
              {user.region}
            </Text>
          </Flex>

          <Heading size="md" mb={2}>
            Services
          </Heading>
          <Flex gap={2} wrap="wrap" mb={4}>
            {user.services.map((service) => (
              <Badge
                key={service.id}
                colorScheme="teal"
                px={3}
                py={1}
                rounded="md"
              >
                {service.name}
              </Badge>
            ))}
          </Flex>

          <Heading size="md" mb={2}>
            Reviews ({user.reviews.length})
          </Heading>
          <Box maxH="300px" overflowY="auto" spaceY={2}>
            {user.reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </Box>

          <Box mt={4}>
            <Heading size="md" mb={2}>
              Add a new review
            </Heading>

            <Fieldset.Root gap="1">
              <Field.Root>
                <StarRating value={rating} onChange={setRating} />
              </Field.Root>

              <Field.Root>
                <Textarea
                  placeholder="Write your feedback here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  resize="vertical"
                />
              </Field.Root>
            </Fieldset.Root>

            <Button
              mt={4}
              colorScheme="green"
              disabled={!rating || !comment.trim()}
              onClick={() => {
                reviewMutation.mutate({ rating, comment });
              }}
            >
              Send review
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default UserDetails;
