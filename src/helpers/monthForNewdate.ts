import { addLeadingZeros } from './addLeadingZeros';

export const monthsWithQueryExist: { [key: string]: string } = {
  Janeiro: '01',
  Feveiro: '02',
  Março: '03',
  Abril: '04',
  Maio: '05',
  Junho: '06',
  Julho: '07',
  Agosto: '08',
  Setembro: '09',
  Outubro: '10',
  Novembro: '11',
  Dezembro: '12',
};

export const formatMonth = (month: string) => {
  if (!month) {
    const currentMonth = new Date().getMonth() + 1;
    const monthWithZero = addLeadingZeros(currentMonth, 2);
    return monthWithZero;
  }
  return monthsWithQueryExist[month];
};
