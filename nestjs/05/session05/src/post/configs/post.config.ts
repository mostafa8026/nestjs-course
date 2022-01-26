import { registerAs } from '@nestjs/config';
export default registerAs('post', () => {
  return {
    currency: process.env.CURRENCY,
    showMobileNumber: process.env.SHOW_MOBILE_NUMBER === 'true',
  };
});
