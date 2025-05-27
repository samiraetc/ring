type User = {
  id: number;
  name: string;
  averageRating: number;
  totalReviews: number;
  region: string;
  services: Service[];
  reviews: Review[];
};

type UserFilterValues = {
  service?: string;
  sortBy?: "rating" | "reviews" | "";
};
