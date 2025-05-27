import { Box, Heading, Input, Button, Fieldset, Field } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { toaster } from "@/components/ui/toaster";
import MenuBar from "@/components/Menu/Menu";

const CreateService = () => {
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: (data: { name: string }) => api.post("/services", data),
    onSuccess: () => {
      toaster.create({
        title: "Service created successfully!",
        type: "success",
        duration: 3000,
      });
      setName("");
    },
    onError: () => {
      toaster.create({
        title: "Error creating service",
        type: "error",
        duration: 4000,
      });
    },
  });

  const handleSubmit = () => {
    if (name.trim()) {
      mutation.mutate({ name });
    }
  };

  return (
    <>
      <MenuBar />
      <Box maxW="md" mx="auto" mt={12}>
        <Heading size="lg" mb={6}>
          Create a new service
        </Heading>

        <Fieldset.Root gap="3">
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              placeholder="Gardening"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field.Root>

          <Button
            onClick={handleSubmit}
            colorScheme="teal"
            mt={4}
            disabled={!name.trim()}
            loading={mutation.isPending}
          >
            Create
          </Button>
        </Fieldset.Root>
      </Box>
    </>
  );
};

export default CreateService;
