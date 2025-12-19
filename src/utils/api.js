export const getTodos = async () => {
  try {
    const response = await fetch(
      `https://6943845a69b12460f314dfab.mockapi.io/training/todos`,
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
      `https://6943845a69b12460f314dfab.mockapi.io/training/todos/${id}`,
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
      `https://6943845a69b12460f314dfab.mockapi.io/training/todos`,
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
      `https://6943845a69b12460f314dfab.mockapi.io/training/todos/${id}`,
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
      `https://6943845a69b12460f314dfab.mockapi.io/training/todos/${id}`,
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
