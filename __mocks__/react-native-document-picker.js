const mockFile = {
  uri: 'file:///mock/file.pdf',
  name: 'file.pdf',
  type: 'application/pdf',
  size: 1234,
};

export default {
  pick: jest.fn(async () => [mockFile]),
  pickSingle: jest.fn(async () => mockFile),
  types: {
    allFiles: 'public.item',
    images: 'public.image',
    pdf: 'com.adobe.pdf',
  },
  isCancel: jest.fn(() => false),
  releaseSecureAccess: jest.fn(),
};

