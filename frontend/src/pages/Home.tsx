import { useQuery } from "@tanstack/react-query";
import { Box, Container, EmptyState, VStack } from "@chakra-ui/react";
import api from "@/api/axios";

import FilterBar from "@/components/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import UserCards from "@/components/UserCards/UserCards";
import Loading from "@/components/Loading/Loading";
import MenuBar from "@/components/Menu/Menu";
import { FaRegFaceFrownOpen } from "react-icons/fa6";

const fetchUsers = async (filters?: UserFilterValues) => {
  const res = await api.get("/users", {
    params: {
      service: filters?.service,
      sortBy: filters?.sortBy,
    },
  });
  localStorage.setItem("userList", JSON.stringify(res.data));
  return res.data;
};

const Home = () => {
  const [filters, setFilters] = useState<UserFilterValues>({});
  const [initialUsers, setInitialUsers] = useState<User[] | undefined>(
    undefined
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedFilters = localStorage.getItem("userFilters");
    const storedUsers = localStorage.getItem("userList");

    try {
      if (storedFilters) {
        const parsedFilters = JSON.parse(storedFilters);
        setFilters(parsedFilters);
      }

      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setInitialUsers(parsedUsers);
      }
    } catch {
      setFilters({});
    } finally {
      setIsReady(true);
    }
  }, []);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => fetchUsers(filters),
    enabled: isReady,
    initialData: initialUsers,
  });
  if (!isReady || (!initialUsers && isLoading)) return <Loading />;

  return (
    <>
      <MenuBar />
      <Container>
        <FilterBar onFilterChange={setFilters} filters={filters} />
        <Box display="flex" flexWrap="wrap" gap={4}>
          {users?.map((user: User) => (
            <UserCards user={user} key={user.id} />
          ))}

          {users?.length === 0 && (
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <FaRegFaceFrownOpen />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>No results found</EmptyState.Title>
                  <EmptyState.Description>
                    Try adjusting your search
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
