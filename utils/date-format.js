import { format } from 'date-fns';

export const convertISOToDate = (str) => format(new Date(str), 'MM/dd/yyyy h:s aaa');
