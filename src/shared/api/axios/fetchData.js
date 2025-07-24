export const fetchData = async ({ method, args = [], setState }) => {
  try {
    const response = await method(...args);
    if (response.success) {
      setState(response.data.data);
    } else {
      console.error("Error in fetchData:", response.error);
    }
  } catch (err) {
    console.error("Exception in fetchData:", err);
  }
};
