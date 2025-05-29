import { Box, Fieldset, Flex, Button } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { useServices } from "@/hooks/useService";

type Props = {
  onSearch: (filters: UserFilterValues) => void;
};

export default function FilterBar({ onSearch }: Props) {
  const [filters, setFilters] = useState<UserFilterValues>({});
  const { data: services = [] } = useServices();

  useEffect(() => {
    localStorage.setItem("userFilters", JSON.stringify(filters));
  }, [filters]);

  const handleServiceChange = (selected: { value: string } | null) => {
    setFilters({
      ...filters,
      service: selected?.value || "",
    });
  };

  const handleSortChange = (
    selected: { value: "rating" | "reviews" | "" } | null
  ) => {
    setFilters({
      ...filters,
      sortBy: selected?.value,
    });
  };

  const serviceOptions = services.map((s: Service) => ({
    label: s.name,
    value: s.name,
  }));

  return (
    <Box mb={6}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Flex gap="4" wrap="wrap" align="end">
            <Box minW="250px" flex="1">
              <Select
                name="service"
                placeholder="Filter by Service"
                isClearable
                options={serviceOptions}
                value={
                  serviceOptions.find(
                    (opt: { value: string }) => opt.value === filters.service
                  ) || null
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
                  filters.sortBy
                    ? {
                        label:
                          filters.sortBy === "rating"
                            ? "Highest Rating"
                            : "Most Reviews",
                        value: filters.sortBy,
                      }
                    : null
                }
                onChange={handleSortChange}
              />
            </Box>

            <Button
              colorScheme="green"
              minW="120px"
              onClick={() => onSearch(filters)}
            >
              Search
            </Button>
          </Flex>
        </Fieldset.Content>
      </Fieldset.Root>
    </Box>
  );
}
