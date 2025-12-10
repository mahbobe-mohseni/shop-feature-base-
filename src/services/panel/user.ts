export const updateUser = async (payload: any): Promise<any | null> => {
  const res = await fetch("/api/panel/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  return data;
};
type payloadType = {
  userId: string;
};
export const deleteUser = async (payload: payloadType): Promise<any | null> => {
  const res = await fetch("/api/panel/user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  return data;
};
