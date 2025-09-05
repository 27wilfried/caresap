import axios from "axios";

export const checkEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const shortenText = (text, n) => {
  if (text?.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const isNew = (createdAt) => {
  if (!createdAt) return false;

  const createdDate = new Date(createdAt.replace(" ", "T"));
  const now = new Date();
  const diffInMs = now - createdDate;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays < 30;
};

// export const host = "http://localhost:5000/";
export const host = "http://172.17.211.121:5000/";
// export const host = "https://back.node.caresap.org/";

export const getData = async (type, config = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get(host + type, { ...config }).then((elt) => {
        resolve(elt.data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// GET par ID
export const getDataParId = async (k, path, config = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get(host + `${path}/${k}`, config).then((elt) => {
        resolve(elt.data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// POST (création)
export const createData = async (path, body, config = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Si body est un FormData, ne rien mettre, sinon JSON
      if (!(body instanceof FormData)) {
        config.headers = {
          ...(config.headers || {}),
          "Content-Type": "application/json",
        };
      }
      const save = await axios.post(host + path, body, config);
      resolve(save);
    } catch (error) {
      reject(error);
    }
  });
};

// PUT (update)
export const updateData = async (k, path, body, config = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!(body instanceof FormData)) {
        config.headers = {
          ...(config.headers || {}),
          "Content-Type": "application/json",
        };
      }
      await axios.put(host + `${path}/${k}`, body, config).then((elt) => {
        resolve(elt);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// DELETE
export const deleteData = async (k, path, config = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(host + `${path}/${k}`, config).then((elt) => {
        resolve({ etat: "success", ret: elt });
      });
    } catch (error) {
      reject({ etat: "echec", ret: error });
    }
  });
};
