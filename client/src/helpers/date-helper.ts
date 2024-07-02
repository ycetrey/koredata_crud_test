export const formatDateBR = (data: any) => {
  const newData = new Date(data);
  return newData.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: 'short' });
};
