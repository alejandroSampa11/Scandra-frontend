import Toast from "react-native-toast-message";

export const showToast = {
  error: (message: string, title: string = "Error") => {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
    });
  },
  success: (message: string, title: string = "Success") => {
    Toast.show({
      type: "success",
      text1: title,
      text2: message,
    });
  },
  info: (message: string, title: string = "Info") => {
    Toast.show({
      type: "info",
      text1: title,
      text2: message,
    });
  },
};
