import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format date in "dd/MM/yyyy" format by default', () => {
    const date = '2023-11-12';
    expect(pipe.transform(date)).toBe('12/11/2023');
  });

  it('should format date in "MM/dd/yyyy" format', () => {
    const date = '2023-11-12';
    expect(pipe.transform(date, 'MM/dd/yyyy')).toBe('11/12/2023');
  });

  it('should format date in "yyyy-MM-dd" format', () => {
    const date = '2023-11-12';
    expect(pipe.transform(date, 'yyyy-MM-dd')).toBe('2023-11-12');
  });

  it('should handle an invalid date string and return "Invalid Date"', () => {
    const invalidDate = 'invalid-date';
    expect(pipe.transform(invalidDate)).toBe('Invalid Date');
  });

  it('should handle an invalid Date object and return "Invalid Date"', () => {
    const invalidDate = new Date('invalid-date');
    expect(pipe.transform(invalidDate)).toBe('Invalid Date');
  });
});
