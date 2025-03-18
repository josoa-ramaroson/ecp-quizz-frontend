import toast from "react-hot-toast";

export async function handleApiExceptions(functionParams:  () => Promise<any>): Promise<void> {
    try {
      await functionParams();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
          toast.error("Unkown error");
      }
    }
  }