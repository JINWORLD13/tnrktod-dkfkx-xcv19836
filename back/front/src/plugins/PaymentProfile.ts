// import { registerPlugin } from '@capacitor/core';

// export interface PaymentProfilePlugin {
//   initializePayment(options: { accountId?: string }): Promise<{ connected: boolean }>;
//   purchaseItem(options: { productId: string, accountId?: string }): Promise<any>;
//   switchAccount(options: { accountId: string }): Promise<{ connected: boolean }>;
// }

// const PaymentProfile = registerPlugin<PaymentProfilePlugin>('PaymentProfile');

// export default PaymentProfile;

import { registerPlugin } from '@capacitor/core';

const PaymentProfile = registerPlugin('PaymentProfile');

export default PaymentProfile;