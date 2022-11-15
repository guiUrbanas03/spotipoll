import { useToast, UseToastOptions } from "@chakra-ui/react";

type ToastData = {
  title: UseToastOptions['title'];
  status: UseToastOptions["status"];
};

export const useDefaultToast = () => {
  const toast = useToast();

  return (data: ToastData) =>
    toast({
      title: data.title,
      position: "bottom-right",
      status: data.status,
      isClosable: true,
    });
};
