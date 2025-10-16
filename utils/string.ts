export const formatToIDR = (value: number): string => {
  if (isNaN(value)) return "Rp 0";

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return formatted.replace("Rp", "Rp ");
};
