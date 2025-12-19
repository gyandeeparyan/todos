export const getTodos = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    const data = await response.json();
    return data;
    
  } catch (error) {
    return null;
  }
};

export const getbyIDTodos = async (id) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/${id}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    const data = await response.json();
    return data;
    
  } catch (error) {
    return null;
  }
};



export const createTodos = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}`,
      {
        method: "POST",
        cache: "no-cache",
        body: payload,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const updateTodos = async (id, payload) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/${id}`,
      {
        method: "PUT",
        cache: "no-cache",
        body: payload,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const deleteTodos = async (id) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/${id}`,
      {
        method: "DELETE",
        cache: "no-cache",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
