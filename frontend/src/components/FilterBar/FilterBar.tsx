import { Box, Fieldset, Flex } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { useServices } from "@/hooks/useService";

type Props = {
  onFilterChange: (filters: UserFilterValues) => void;
  filters: UserFilterValues;
};

export default function FilterBar({ onFilterChange, filters }: Props) {
  const { data: services = [] } = useServices();

  const [selectedService, setSelectedService] = useState<string | null>(
    filters.service || null
  );
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "">(
    filters.sortBy || ""
  );

  useEffect(() => {
    setSelectedService(filters.service || null);
  }, [filters.service]);

  useEffect(() => {
    setSortBy((filters.sortBy as "rating" | "reviews" | "") || "");
  }, [filters.sortBy]);

  useEffect(() => {
    onFilterChange({
      service: selectedService || undefined,
      sortBy: sortBy || undefined,
    });
  }, [selectedService, sortBy]);

  useEffect(() => {
    const filters = {
      service: selectedService,
      sortBy,
    };
    localStorage.setItem("userFilters", JSON.stringify(filters));
  }, [selectedService, sortBy]);

  const handleServiceChange = (selected: { value: string } | null) => {
    setSelectedService(selected?.value || "");
  };

  const handleSortChange = (selected: { value: string } | null) => {
    setSortBy((selected?.value as "rating" | "reviews" | "") || "");
  };

  const serviceOptions = services.map((s: Service) => ({
    label: s.name,
    value: s.name,
  }));

  return (
    <Box mb={6}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Flex gap="4" wrap="wrap">
            <Box minW="250px" flex="1">
              <Select
                name="service"
                placeholder="Filter by Service"
                isClearable
                options={serviceOptions}
                value={
                  selectedService
                    ? { label: selectedService, value: selectedService }
                    : null
                }
                onChange={handleServiceChange}
              />
            </Box>

            <Box minW="250px" flex="1">
              <Select
                name="sort"
                placeholder="Sort by"
                isClearable
                options={[
                  { label: "Highest Rating", value: "rating" },
                  { label: "Most Reviews", value: "reviews" },
                ]}
                value={
                  sortBy
                    ? {
                        label:
                          sortBy === "rating"
                            ? "Highest Rating"
                            : "Most Reviews",
                        value: sortBy,
                      }
                    : null
                }
                onChange={handleSortChange}
              />
            </Box>
          </Flex>
        </Fieldset.Content>
      </Fieldset.Root>
    </Box>
  );
}
