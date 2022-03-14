const formatDate = (ms) => {
  const date = new Date(ms);
  return (
    date.toLocaleString().split(",")[0] +
    " " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );
};

export { formatDate };
