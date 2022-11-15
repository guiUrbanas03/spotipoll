import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, UseFormReturn } from "react-hook-form/dist/types";

type CreatePoll = {
  title: string;
  description?: string;
  max_tracks?: number;
  spotify_user_id: string;
  spotify_playlist_id: string;
};

type CreatePollFormProps = {
  form: UseFormReturn<CreatePoll>;
};

const CreatePollForm: React.FC<CreatePollFormProps> = ({ form }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <FormControl>
      <VStack spacing={4} alignItems="stretch" w="full">
        <Box>
          <FormLabel>Poll title</FormLabel>
          <Input type="text" {...register("title")} />
        </Box>
        <Box pb={4}>
          <FormLabel>Poll description</FormLabel>
          <Input type="text" {...register("description")} />
        </Box>
        <Box borderTopWidth={1} borderColor="whiteAlpha.300" pt={4}>
          <Checkbox
            isChecked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            marginBottom={4}
          >
            Set max number of tracks
          </Checkbox>
          <Box>
            <Input
              opacity={isChecked ? 1 : 0}
              width="fit-content"
              type="number"
              disabled={!isChecked}
              {...register("max_tracks")}
            />
            <FormHelperText color="whiteAlpha.400">
              This value will determine how many tracks will be used to generate
              the result.
            </FormHelperText>
          </Box>
        </Box>
      </VStack>
    </FormControl>
  );
};

export default CreatePollForm;
