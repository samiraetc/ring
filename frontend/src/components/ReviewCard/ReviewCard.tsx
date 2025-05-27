import { Box, Text } from "@chakra-ui/react";
import StarRating from "../Rating/Rating";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Box background="#fdf8f4" rounded="md" paddingX={6} paddingY={4}>
      <StarRating value={review.rating} isReadOnly />

      <Text fontSize={14} color="gray.500">{review.comment}</Text>
    </Box>
  );
};

export default ReviewCard;
