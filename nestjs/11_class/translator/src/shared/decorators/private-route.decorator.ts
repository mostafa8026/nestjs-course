import { SetMetadata, applyDecorators } from '@nestjs/common';
import { PRIVATE_METADATA } from 'src/shared/constants/metadata.constant';

export function PrivateRoute() {
  return applyDecorators(SetMetadata(PRIVATE_METADATA, true));
}
