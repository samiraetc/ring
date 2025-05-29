import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [appliedFilters, setAppliedFilters] = useState<UserFilterValues>({});
  const queryClient = useQueryClient();
  const [storedUsers, setStoredUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const usersFromStorage = localStorage.getItem("userList");
    if (usersFromStorage) {
      try {
        const parsed = JSON.parse(usersFromStorage);
        setStoredUsers(parsed);

        queryClient.setQueryData(["users", {}], parsed);
      } catch {
        setStoredUsers([]);
      }
    } else {
      setStoredUsers([]);
    }
  }, [queryClient]);

  // const cachedData = queryClient.getQueryData<User[]>([
  //   "users",
  //   appliedFilters,
  // ]);

  const {
    data: users,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["users", appliedFilters],
    queryFn: () => fetchUsers(appliedFilters),
    enabled: storedUsers !== null,
    initialData: storedUsers ?? [],
  });

  if (isLoading && (!storedUsers || storedUsers.length === 0)) {
    return <Loading />;
  }

  return (
    <>
      <MenuBar />
      <Container>
        <FilterBar onSearch={setAppliedFilters} />
        <Box display="flex" flexWrap="wrap" gap={4}>
          {!isLoading && !isFetching && users?.length === 0 ? (
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
          ) : (
            users?.map((user: User) => <UserCards user={user} key={user.id} />)
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
