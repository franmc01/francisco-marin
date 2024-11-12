import { ImagePlaceholderPipe } from './image-placeholder.pipe';

describe('ImagePlaceholderPipe', () => {
  let pipe: ImagePlaceholderPipe;

  beforeEach(() => {
    pipe = new ImagePlaceholderPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the image URL if it is valid', () => {
    const imageUrl = 'https://example.com/image.jpg';
    expect(pipe.transform(imageUrl)).toBe(imageUrl);
  });

  it('should return the placeholder URL if the image URL is null', () => {
    expect(pipe.transform(null)).toBe('https://via.placeholder.com/50');
  });

  it('should return the placeholder URL if the image URL is undefined', () => {
    expect(pipe.transform(undefined)).toBe('https://via.placeholder.com/50');
  });

  it('should return the placeholder URL if the image URL is an empty string', () => {
    expect(pipe.transform('')).toBe('https://via.placeholder.com/50');
  });

  it('should return the placeholder URL if the image URL has an invalid format', () => {
    const invalidUrl = 'https://example.com/image.txt';
    expect(pipe.transform(invalidUrl)).toBe('https://via.placeholder.com/50');
  });

  it('should use a custom placeholder URL if provided', () => {
    const customPlaceholder = 'https://example.com/custom-placeholder.png';
    expect(pipe.transform(null, customPlaceholder)).toBe(customPlaceholder);
  });
});
