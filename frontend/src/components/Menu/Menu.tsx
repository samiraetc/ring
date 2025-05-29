import { Flex, Link, Box, Image } from "@chakra-ui/react";
import Logo from "@/assets/header-logo.svg";

function MenuBar() {
  const menuOptions = [
    {
      name: "List",
      href: "/",
    },
    {
      name: "Create User",
      href: "/user",
    },
    {
      name: "Create Services",
      href: "/services",
    },
  ];

  return (
    <Flex
      as="nav"
      color="white"
      padding="4"
      justify="space-between"
      align="center"
      paddingX={4}
    >
      <Link href="/">
      <Image src={Logo} alt="Logo" h={8} />
      </Link>
      <Box>
        {menuOptions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            mx="2"
            fontWeight={location.pathname === item.href ? "bold" : "normal"}
            color={location.pathname === item.href ? "orange.400" : "black"}
            _hover={{ textDecoration: "underline" }}
          >
            {item.name}
          </Link>
        ))}
      </Box>
    </Flex>
  );
}

export default MenuBar;
