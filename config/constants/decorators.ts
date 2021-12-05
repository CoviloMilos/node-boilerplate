import { inject } from 'inversify';
import { TYPES } from './types.constant';

export const HelloWorldSvc = inject(TYPES.HelloWorldService);
export const HelloWorldRepo = inject(TYPES.HelloWorldRepository);
export const UserId = inject(TYPES.UserId);
