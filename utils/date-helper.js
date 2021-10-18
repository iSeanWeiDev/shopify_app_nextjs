import { format, formatDistanceToNow } from 'date-fns';

export const convertISOToDate = (str) => format(new Date(str), 'MM/dd/yyyy h:s aaa');

export const distanceDate = (str) => formatDistanceToNow(new Date(str), { addSuffix: true });
