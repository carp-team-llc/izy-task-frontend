import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
} from "../../../component/toastify/Toastify";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

type SocialLink = {
  platform: string;
  url: string;
};

type ProfileParams = {
  fullName: string;
  bio: string;
  dateOfBirth: string;
  gender: string;
  avatar?: string;
  socials?: SocialLink[];
};

type Response = {
  data: any;
};

const useCreateProfile = () => {
  const navigate = useNavigate();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: ProfileParams) => {
      return rootApi.post<ProfileParams, Response>(
        endpoint.create_profile,
        variables
      );
    },
    onSuccess: (response: any) => {
      notifySuccess(response?.data?.message || "CreateProfile successfully!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      notifyError(error.response?.data?.message || "An error occurred!");
    },
  });

  return {
    isError,
    data,
    error,
    onCreateProfile: mutateAsync,
  };
};

export default useCreateProfile;
