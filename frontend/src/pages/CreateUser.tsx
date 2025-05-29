"use client";

import {
  Box,
  Heading,
  Input,
  Button,
  Fieldset,
  Field,
  Badge,
  Combobox,
  Portal,
  Wrap,
  createListCollection,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import MenuBar from "@/components/Menu/Menu";

type Service = {
  id: number;
  name: string;
};

const CreateUser = () => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceNames, setSelectedServiceNames] = useState<string[]>(
    []
  );
  const [searchValue, setSearchValue] = useState("");

  // Fetch services
  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  const filteredItems = useMemo(
    () =>
      services
        .map((s) => s.name)
        .filter((name) =>
          name.toLowerCase().includes(searchValue.toLowerCase())
        ),
    [services, searchValue]
  );

  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems]
  );

  const mutation = useMutation({
    mutationFn: (data: {
      name: string;
      region: string;
      serviceIds: number[];
    }) => api.post("/users", data),
    onSuccess: () => {
      toaster.create({
        title: "User created successfully!",
        type: "success",
        duration: 3000,
      });
      setName("");
      setRegion("");
      setSelectedServiceNames([]);
    },
    onError: () => {
      toaster.create({
        title: "Error creating user",
        type: "error",
        duration: 4000,
      });
    },
  });

  const handleSubmit = () => {
    const serviceIds = services
      .filter((s) => selectedServiceNames.includes(s.name))
      .map((s) => s.id);

    mutation.mutate({ name, region, serviceIds });
  };

  return (
    <>
      <MenuBar />
      <Box maxW="md" mx="auto" mt={12}>
        <Heading size="lg" mb={6}>
          Create new user
        </Heading>

        <Fieldset.Root gap="4">
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>City</Field.Label>
            <Input value={region} onChange={(e) => setRegion(e.target.value)} />
          </Field.Root>

          <Field.Root>
            <Field.Label>Services</Field.Label>
            <Combobox.Root
              multiple
              width="100%"
              value={selectedServiceNames}
              collection={collection}
              onValueChange={(details) =>
                setSelectedServiceNames(details.value)
              }
              onInputValueChange={(details) =>
                setSearchValue(details.inputValue)
              }
            >
              <Wrap gap="2" mb={2}>
                {selectedServiceNames.map((name) => (
                  <Badge key={name}>{name}</Badge>
                ))}
              </Wrap>

              <Combobox.Control>
                <Combobox.Input placeholder="Search services" />
                <Combobox.IndicatorGroup>
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>

              <Portal>
                <Combobox.Positioner>
                  <Combobox.Content>
                    <Combobox.ItemGroup>
                      {filteredItems.map((item) => (
                        <Combobox.Item key={item} item={item}>
                          {item}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                      <Combobox.Empty>No services found</Combobox.Empty>
                    </Combobox.ItemGroup>
                  </Combobox.Content>
                </Combobox.Positioner>
              </Portal>
            </Combobox.Root>
          </Field.Root>

          <Button
            mt={4}
            colorScheme="teal"
            onClick={handleSubmit}
            disabled={
              !name.trim() ||
              !region.trim() ||
              selectedServiceNames.length === 0
            }
            loading={mutation.isPending}
          >
            Create user
          </Button>
        </Fieldset.Root>
      </Box>
    </>
  );
};

export default CreateUser;
