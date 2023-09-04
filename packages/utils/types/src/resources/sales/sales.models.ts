export interface Purchase {
  transaction: string;
  order_date: number;
  approved_date: number;
  status: string;
  recurrency_number: number;
  is_subscription: boolean;
  commission_as: string;
  price: Price;
  payment: PaymentInfo;
  tracking: Tracking;
  warranty_expire_date: number;
  offer: Offer;
  hotmart_fee: HotmartFee;
}

export interface Buyer {
  name: string;
  email: string;
  ucode: string;
}

export interface Producer {
  name: string;
  ucode: string;
}

export interface Product {
  id: number;
  name: string;
}

export interface HotmartFee {
  fixed: number;
  base: number;
  total: number;
  currency_code: string;
}

export interface Offer {
  payment_mode: string;
  code: string;
}

export interface Tracking {
  source: string;
  source_sck: string;
  external_code: string;
}

export type PaymentType =
  | "BILLET"
  | "CASH_PAYMENT"
  | "CREDIT_CARD"
  | "DIRECT_BANK_TRANSFER"
  | "DIRECT_DEBIT"
  | "FINANCED_BILLET"
  | "FINANCED_INSTALLMENT"
  | "GOOGLE_PAY"
  | "HOTCARD"
  | "HYBRID"
  | "MANUAL_TRANSFER"
  | "PAYPAL"
  | "PAYPAL_INTERNACIONAL"
  | "PICPAY"
  | "PIX"
  | "SAMSUNG_PAY"
  | "WALLET";

export type PaymentMethod =
  | "BACS_DIRECT_DEBIT"
  | "BALOTO"
  | "BANK_DEBIT"
  | "BILLET"
  | "CREDIT_CARD_AMERICAN_EXPRESS"
  | "CREDIT_CARD_AURA"
  | "CREDIT_CARD_DINERS"
  | "CREDIT_CARD_DISCOVER"
  | "CREDIT_CARD_ELO"
  | "CREDIT_CARD_HIPERCARD"
  | "CREDIT_CARD_MASTERCARD"
  | "CREDIT_CARD_VISA"
  | "CUPON_DE_PAGO"
  | "DIRECT_BANK_TRANSFER_ADYEN_SOFORT"
  | "FINANCED_BILLET"
  | "FINANCED_INSTALLMENT_ADYEN_ONEY"
  | "FINANCED_INSTALLMENT_ADYEN_ONEY_10X"
  | "FINANCED_INSTALLMENT_ADYEN_ONEY_12X"
  | "FINANCED_INSTALLMENT_ADYEN_ONEY_3X"
  | "FINANCED_INSTALLMENT_ADYEN_ONEY_4X"
  | "FINANCED_INSTALLMENT_ADYEN_ONEY_6X"
  | "GOOGLE_PAY"
  | "HOTMART"
  | "HYBRID"
  | "IN_APP_PURCHASE"
  | "MULTIBANCO"
  | "OXXO"
  | "PAGO_EFECTIVO"
  | "PAYPAL"
  | "PICPAY"
  | "PIX"
  | "SAMSUNG_PAY"
  | "SEPA_DIRECT_DEBIT"
  | "BANK_TRANSFER_BB"
  | "BANK_TRANSFER_BRADESCO"
  | "BANK_TRANSFER_ITAU"
  | "APPLE_PAY"
  | "UNKNOWN_CREDIT_CARD"
  | "UNKNOWN";

export interface PaymentInfo {
  installments_number?: number;
  type: PaymentType;
  method: PaymentMethod;
}

export interface Price {
  /** Shows the price of each recurrence of the subscription */
  value: number;

  /**Shows the code of the subscription payment currency. It is a three-digit international code, for example, BRL, USD, EUR, ... */
  currency_code: string;
}
