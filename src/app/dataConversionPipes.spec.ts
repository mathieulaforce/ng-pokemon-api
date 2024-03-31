import { ConvertLengthPipe } from './dataConversionPipes';

describe('ConvertLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('convert 1 meter to milimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'm', 'mm')).toBe(1000);    
  });

  it('convert 1 centimeter to milimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'cm', 'mm')).toBe(10);    
  });

  it('convert 1 kilometer to milimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'km', 'mm')).toBe(1000000);    
  });

  it('convert 1 milimeter to milimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'mm', 'mm')).toBe(1);    
  });

  it('convert 1 meter to centimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'm', 'cm')).toBe(100);    
  });

  it('convert 1 centimeter to centimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'cm', 'cm')).toBe(1);    
  });

  it('convert 1 kilometer to centimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'km', 'cm')).toBe(100000);    
  });

  it('convert 1 milimeter to centimeter', () => {
    const pipe = new ConvertLengthPipe();
    expect(pipe.transform(1, 'mm', 'cm')).toBe(0.1);    
  });
});
