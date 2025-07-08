export const fetchFreelancerData = async ({
  method,
  args = [],
  setState,
  onSuccess,
  onError,
}) => {
  try {
    const response = await method(...args);
    if (response.success) {
      setState(response.data.data);
      onSuccess?.(response.data.data);
    } else {
      console.error("Error in fetchFreelancerData:", response.error);
      onError?.(response.error);
    }
  } catch (err) {
    console.error("Exception in fetchFreelancerData:", err);
    onError?.(err);
  }
};
