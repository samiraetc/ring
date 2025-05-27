import { RatingGroup } from "@chakra-ui/react";

interface StarRatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  max?: number;
  isReadOnly?: boolean;
}

const StarRating = ({
  value = 0,
  onChange,
  isReadOnly = false,
  max = 5,
}: StarRatingProps) => {
  return (
    <RatingGroup.Root
      allowHalf={true}
      value={value}
      readOnly={isReadOnly}
      onValueChange={({ value }) => {
        if (!isNaN(value)) {
          onChange?.(value);
        }
      }}
      colorPalette="orange"
      count={max}
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  );
};

export default StarRating;
