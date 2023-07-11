/**
 * This is an extension of the HotmartAccessTokenObject and it is used , use it for validating the token.
 * @example
 * ```js
    {
      "access_token": "wxyz",
      "token_type": "bearer",
      "expires_in": 172799,
      "scope": "read write",
      "jti": "da2eff63-754d-4v76-9b3a-19bdb5cc8f36"
      "expiryDate": 1688010332473
    }

 * ```
 */
export interface AccessTokenObject extends HotmartAccessTokenObject {
  expiryDate: number
}

export interface HotmartAccessTokenObject {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string,
  jti: string
}

export interface Price {
  /** Shows the price of each recurrence of the subscription */
  value: number,

  /**Shows the code of the subscription payment currency. It is a three-digit international code, for example, BRL, USD, EUR, ... */
  currency_code: string
}

export interface Secret {
  client_id: string
  client_secret: string
  basic: string
}

export interface Shopper {
  /**Buyer's email address. */
  email: string;

  /**Buyer's phone number. */
  phone: string;
}

export interface Subscriber {
  name: string,
  email: string,
  ucode: string
}

/**
 * 
 * @example Hotmart Subscription Object
 *
 * ```json
  {
      "subscriber_code": "ABC12DEF",
      "subscription_id": 123456,
      "status": "ACTIVE",
      "accession_date": 1577847600,
      "end_accession_date": 1641005999,
      "request_date": 1577847600,
      "date_next_charge": 1580558059,      
      "trial": false,
      "transaction": "HP16616613605324",
      "plan": {
        "name": "Plan name",
        "id": 726420,
        "recurrency_period": 30,
        "max_charge_cycles": 6
      },
      "product": {
        "id": 123456,
        "name": "Product Name",
        "ucode": "12a34bcd-56e7-4847-fg89-h1i23j4567l8"
      },
      "price": {
        "value": 123.45,
        "currency_code": "BRL"
      },
      "subscriber": {
        "name": "Subscriber name",
        "email": "subscriber@email.com.br",
        "ucode": "10a98bcd-76e5-4321-fg09-h8i76j5432l1"
      }
    }
 * ```
 */
export interface Subscription {

  /** Brings the code of that subscriber. This field is used by the external system to identify a subscriber to a subscription. The same buyer will have 2 different subscriber codes if they subscribe to two different products. */
  subscriber_code: string,

  /** Shows the subscription identification number at Hotmart. */
  subscription_id: number,

  /** Shows the status of the moment when that subscription is found. These statuses can be: ACTIVE, INACTIVE, DELAYED, CANCELLED_BY_CUSTOMER, CANCELLED_BY_SELLER, CANCELLED_BY_ADMIN, STARTED or OVERDUE*/
  status: string,

  /** Shows the initial release date for access to the content of the subscription. */
  accession_date: number,

  /** The date on which the subscriber requested cancellation of the subscription. The date must be in milliseconds, as of 1970-01-01 00:00:00 UTC */
  end_accession_date: number,

  /** Shows the date the subscription was created. */
  request_date: number,

  /** Returns the next payment attempt date. In the case of canceled subscriptions, it will indicate the subscriber's last product access date and no charges will be made after this period. 
   * 
   * E.g.: the subscriber purchased a product that is billed every 10th of the month. If, on the 20th of this month, the subscriber decided to unsubscribe, the date shown in this field will be the 10th of the subsequent month.
   * 
   * This information will be returned in milliseconds, as of 1970-01-01 00:00:00 UTC
  */
  date_next_charge: number,

  /** Indicates whether the subscription has or had a trial period. The value 'true' means yes, 'false' does not. */
  trial: boolean,

  /** Unique identifier for a transaction, for example, HP17715690036014. A transaction takes place when an order is placed. An order can be the generation of a bank payment slip, an approved purchase, a recurring purchase, and more. */
  transaction: string

  /** Shows the plan data. */
  plan: {
    /** Shows the name of the subscription plan. */
    name: string
    /** Unique ID of the subscription plan. */
    id: string
    /** Returns the recurrence frequency of the subscription. The possible values for this field are 7, 30, 60, 90, 180, and 360, and they represent, respectively, the following periodicity for recurring payments: weekly, monthly, bimonthly, quarterly, semiannually, and annually. */
    recurrency_period: number
    /** Maximum number of recurring payments of the product. If this field is not returned, it means that the product was set up for the billing cycle to continue until the subscriber requests to cancel the subscription. */
    max_charge_cycles: number
  }

  /** Shows the product data. */
  product: {
    /** Shows the product ID. */
    id: number,
    /** Shows the name of the subscription product. */
    name: string,
    /** Shows the external identification of a product. It is what you are going to use in your system to identify the product. */
    ucode: string
  },

  /** Shows the price data. */
  price: Price,

  /** Shows the subscriber data. */
  subscriber: Subscriber
}

export interface SubscriptionPurchase {

  /**
   * This field shows the transaction code, ex: HP17715690036014
   */
  transaction: string;

  /** Shows the day the order was approved. */
  approved_date: Date;

  /** Shows the payment platform. For example, if it was paid using HotPay or HotPay Internacional. */
  payment_engine: string;

  /** Shows the purchase status. The possible values for this field are: APPROVED, BLOCKED, CANCELLED, CHARGEBACK, COMPLETE, EXPIRED, NO_FUNDS, OVERDUE, PARTIALLY_REFUNDED, PRE_ORDER, PRINTED_BILLET, PROCESSING_TRANSACTION, PROTESTED, REFUNDED, STARTED, UNDER_ANALISYS or WAITING_PAYMENT 
   * 
   * The description of each status can be found on the support page {@link https://help.hotmart.com/en/article/Quais-status-uma-transa%C37%C33o-pode-assumir-/216441297 }.
  */
  status: "APPROVED" | "BLOCKED" | "CANCELLED" | "CHARGEBACK" | "COMPLETE" | "EXPIRED" | "NO_FUNDS" | "OVERDUE" | "PARTIALLY_REFUNDED" | "PRE_ORDER" | "PRINTED_BILLET" | "PROCESSING_TRANSACTION" | "PROTESTED" | "REFUNDED" | "STARTED" | "UNDER_ANALISYS" | "WAITING_PAYMENT";

  /**
   * Shows the price information.
   */
  price: Price,

  /**
   * Type of payment selected by the buyer to make the purchase. Possible values for this field include:
   * BILLET, CASH_PAYMENT, CREDIT_CARD, DIRECT_BANK_TRANSFER, DIRECT_DEBIT, FINANCED_BILLET, FINANCED_INSTALLMENT, GOOGLE_PAY, HOTCARD, HYBRID, MANUAL_TRANSFER, PAYPAL, PAYPAL_INTERNACIONAL, PICPAY, PIX, SAMSUNG_PAY e WALLET
   */
  payment_type: "BILLET" | "CASH_PAYMENT" | "CREDIT_CARD" | "DIRECT_BANK_TRANSFER" | "DIRECT_DEBIT" | "FINANCED_BILLET" | "FINANCED_INSTALLMENT" | "GOOGLE_PAY" | "HOTCARD" | "HYBRID" | "MANUAL_TRANSFER" | "PAYPAL" | "PAYPAL_INTERNACIONAL" | "PICPAY" | "PIX" | "SAMSUNG_PAY" | "WALLET";

  /**
   * Payment method used for the purchase. Possible values for this field include:
   * BACS_DIRECT_DEBIT, BALOTO, BANK_DEBIT, BILLET, CREDIT_CARD_AMERICAN_EXPRESS, CREDIT_CARD_AURA, CREDIT_CARD_DINERS, CREDIT_CARD_DISCOVER, CREDIT_CARD_ELO, CREDIT_CARD_HIPERCARD, CREDIT_CARD_MASTERCARD, CREDIT_CARD_VISA, CUPON_DE_PAGO, DIRECT_BANK_TRANSFER_ADYEN_SOFORT, FINANCED_BILLET, FINANCED_INSTALLMENT_ADYEN_ONEY, FINANCED_INSTALLMENT_ADYEN_ONEY_10X, FINANCED_INSTALLMENT_ADYEN_ONEY_12X, FINANCED_INSTALLMENT_ADYEN_ONEY_3X, FINANCED_INSTALLMENT_ADYEN_ONEY_4X, FINANCED_INSTALLMENT_ADYEN_ONEY_6X, GOOGLE_PAY, HOTMART, HYBRID, IN_APP_PURCHASE, MULTIBANCO, OXXO, PAGO_EFECTIVO, PAYPAL, PICPAY, PIX, SAMSUNG_PAY, SEPA_DIRECT_DEBIT, BANK_TRANSFER_BB, BANK_TRANSFER_BRADESCO, BANK_TRANSFER_ITAU and APPLE_PAY
   */
  payment_method: "BACS_DIRECT_DEBIT" | "BALOTO" | "BANK_DEBIT" | "BILLET" | "CREDIT_CARD_AMERICAN_EXPRESS" | "CREDIT_CARD_AURA" | "CREDIT_CARD_DINERS" | "CREDIT_CARD_DISCOVER" | "CREDIT_CARD_ELO" | "CREDIT_CARD_HIPERCARD" | "CREDIT_CARD_MASTERCARD" | "CREDIT_CARD_VISA" | "CUPON_DE_PAGO" | "DIRECT_BANK_TRANSFER_ADYEN_SOFORT" | "FINANCED_BILLET" | "FINANCED_INSTALLMENT_ADYEN_ONEY" | "FINANCED_INSTALLMENT_ADYEN_ONEY_10X" | "FINANCED_INSTALLMENT_ADYEN_ONEY_12X" | "FINANCED_INSTALLMENT_ADYEN_ONEY_3X" | "FINANCED_INSTALLMENT_ADYEN_ONEY_4X" | "FINANCED_INSTALLMENT_ADYEN_ONEY_6X" | "GOOGLE_PAY" | "" | "HYBRID" | "IN_APP_PURCHASE" | "MULTIBANCO" | "OXXO" | "PAGO_EFECTIVO" | "PAYPAL" | "PICPAY" | "PIX" | "SAMSUNG_PAY" | "SEPA_DIRECT_DEBIT" | "BANK_TRANSFER_BB" | "BANK_TRANSFER_BRADESCO" | "BANK_TRANSFER_ITAU" | "APPLE_PAY";

  /** Shows the corresponding recurrence number. */
  recurrency_number: number;

  /** Shows if the transaction is under the guarantee. */
  under_warranty: boolean;

  /** purchase_subscription */
  purchase_subscription: boolean;
}

export interface MemberAreaModule {
  module_id: string;
  name: string;
  sequence: number;
  is_extra: boolean;
  is_extra_paid: boolean;
  is_public: boolean;
  classes: string[];
  total_pages: number;
}

export interface MemberAreaPage {
  page_id: string;
  name: string;
  page_order: number;
  type: 'CONTENT' | 'ADVERTISEMENT' | 'QUIZ' | 'WEBINAR';
  is_published: boolean;
  total_comments: number;
  rates_average: number;
  rates: Array<{
    rate: 1 | 2 | 3 | 4 | 5;
    total: number;
  }>;
  has_media: boolean;
  liberation_type?: 'BY_DAYS' | 'BY_DATE';
  liberation_date?: string;
  liberation_days?: number;
  has_duration: boolean;
  days_of_duration?: number;
}

export interface MemberAreaStudent {
  user_id: string;
  engagement: string;
  name: string;
  email: string;
  last_access_date: number;
  role: 'STUDENT' | 'FREE_STUDENT' | 'OWNER' | 'ADMIN' | 'CONTENT_EDITOR' | 'MODERATOR';
  first_access_date: number;
  locale: string;
  plus_access: 'WITHOUT_PLUS_ACCESS' | 'HOLDER' | 'HOLDER_WITH_DEPENDENTS' | 'HOLDER_WITHOUT_DEPENDENTS' | 'DEPENDENT';
  progress: {
    completed_percentage: number;
    total: number;
    completed: number;
  };
  status: 'ACTIVE' | 'BLOCKED' | 'BLOCKED_BY_OWNER' | 'OVERDUE';
  access_count: number;
  is_deletable: boolean;
  class_id: string;
  type: 'BUYER' | 'IMPORTED' | 'FREE' | 'OWNER' | 'GUEST'
}