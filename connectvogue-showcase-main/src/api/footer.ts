const API = "http://localhost:5000/api/footer";

export const fetchFooter = async () => {
  const res = await fetch(API);
  return res.json();
};
