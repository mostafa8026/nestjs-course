import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';

export const isPublic = () => {
  return SetMetadata(IS_PUBLIC, true);
};
