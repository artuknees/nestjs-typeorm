import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// Decorador personalizado para repetir donde quiera
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
