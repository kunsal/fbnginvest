import { Toast } from "native-base";

export const notify = (message, label, type) => {
  Toast.show({
    text: message,
    buttonText: label ? label : 'Okay', 
    type: type ? type : 'danger',
    position: 'top',
    duration: 10000
  })
}

