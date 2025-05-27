import {
  Button,
  Dialog,
  Field,
  Input,
  Stack,
  Badge,
  Combobox,
  Portal,
  Wrap,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/user/userSlice";
import { BiPencil, BiX } from "react-icons/bi";
import { useServices } from "@/hooks/useService";

type Props = {
  user: User;
};

export default function EditUserModal({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState(user.region);
  const [selectedServiceNames, setSelectedServiceNames] = useState<string[]>(
    user.services.map((s) => s.name)
  );
  const [searchValue, setSearchValue] = useState("");

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data: services = [] } = useServices({ enabled: open });

  const filteredItems = useMemo(
    () =>
      services
        .map((s: Service) => s.name)
        .filter((name: string) =>
          name.toLowerCase().includes(searchValue.toLowerCase())
        ),
    [services, searchValue]
  );

  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems]
  );

  const updateMutation = useMutation({
    mutationFn: () => {
      const serviceIds = services
        .filter((s: Service) => selectedServiceNames.includes(s.name))
        .map((s: Service) => s.id);

      return api.put(`/users/${user.id}`, { region, serviceIds });
    },
    onSuccess: (res) => {
      dispatch(setSelectedUser(res.data));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      setRegion(user.region);
      setSelectedServiceNames(res.data.services.map((s: Service) => s.name));
    },
  });

  const handleClose = () => {
    setOpen(false);
    setRegion(user.region);
    setSelectedServiceNames(user.services.map((s) => s.name));
    setSearchValue("");
  };

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        colorScheme="teal"
        variant="ghost"
      >
        <BiPencil />
      </Button>

      <Dialog.Root open={open} onOpenChange={handleClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content padding={4} maxW="lg">
            <Dialog.Title>Edit User</Dialog.Title>
            <Dialog.Description>
              Update the region and services
            </Dialog.Description>

            <Stack gap="4" mt="4">
              <Field.Root>
                <Field.Label>Region</Field.Label>
                <Input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
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
                    <Combobox.Positioner zIndex={1500}>
                      <Combobox.Content zIndex={1500}>
                        <Combobox.ItemGroup>
                          {filteredItems.map((item: string) => (
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
            </Stack>

            <Stack mt="6" direction="row" justify="flex-end">
              <Dialog.CloseTrigger asChild>
                <Button variant="ghost" padding={0} h={8}>
                  <BiX />
                </Button>
              </Dialog.CloseTrigger>
              <Button
                colorScheme="blue"
                onClick={() => updateMutation.mutate()}
                loading={updateMutation.isPending}
              >
                Save
              </Button>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
