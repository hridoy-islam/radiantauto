const STORAGE_KEY = "radiant_compare";

export const getCompareList = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addToCompare = (car) => {
  const list = getCompareList();
  if (list.some((item) => item._id === car._id)) return list;
  const updated = [...list, car];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const removeFromCompare = (carId) => {
  const list = getCompareList();
  const updated = list.filter((item) => item._id !== carId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const isInCompare = (carId) => {
  return getCompareList().some((item) => item._id === carId);
};

export const clearCompare = () => {
  localStorage.removeItem(STORAGE_KEY);
};
