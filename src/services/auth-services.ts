export const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (formData: {
  password: string;
  phone: string;
  rememberMe: boolean;
}) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (formData: {
  name: string;
  family: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
