import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

type SignInFormProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const signInFormSchema = yup.object({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export const SignInForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormProps> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  const isSmallVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Flex as="form" flexDir="column" onSubmit={handleSubmit(handleSignIn)}>
      <Stack spacing="2">
        <Input
          name="email"
          label="E-mail"
          error={errors.email}
          {...register("email")}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          error={errors.password}
          {...register("password")}
        />
      </Stack>

      <Flex mt="10" justify="space-between">
        {isSmallVersion ? (
          <Flex flexDir={["column", "row"]} align="center" justify="flex-start">
            <Text color="gray.400">Don't have an account?</Text>
            <Button variant="unstiled" color="blue.500">
              Sign Up
            </Button>
          </Flex>
        ) : (
          <Link href="./auth/signup">
           <Button variant="unstiled" color="blue.500" >
            <Text fontWeight="900">Sign Up</Text>
          </Button>
          </Link>
        )}
        <Box>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={formState.isSubmitting}
            fontWeight="900"
          >
            Sign In
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
