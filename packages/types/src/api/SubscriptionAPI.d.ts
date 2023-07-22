import { CommonRequest, PagedResponse } from "../API";
import { Shopper, Subscription, SubscriptionPurchase } from "../Entity";

/**
 * Request parameters for the GET subscriptions route:
 * {@link https://developers.hotmart.com/payments/api/v1/subscriptions}
 */
export interface SubscriptionsGetRequestParameters extends CommonRequest<SubscriptionsGetRequestParameters> {
  /** Shows the ID (it is a 7-digit number) of your subscription product. */
  product_id: number;

  /** Shows the name of the plan to which the subscriber has selected. This attribute can receive multiple values, as long as the user repeats their key in the request with different values.*/
  plan: string[];

  /**Unique ID of the subscription plan. */
  plan_id: number;

  /** Shows the start date of the subscription. If no value is entered, the current date minus 30 days will be considered. The date must be in milliseconds, from 1970-01-01 00:00:00 UTC.*/
  accession_date: number;

  /** The date on which the subscriber requested the cancellation of the subscription. The date must be in milliseconds, from 1970-01-01 00:00:00 UTC. */
  end_accession_date: number;

  /** Shows the status of the moment when that subscription is found. These statuses can be: ACTIVE, INACTIVE, DELAYED, CANCELLED_BY_CUSTOMER, CANCELLED_BY_SELLER, CANCELLED_BY_ADMIN, STARTED or OVERDUE */
  status: "ACTIVE" | "INACTIVE" | "DELAYED" | "CANCELLED_BY_CUSTOMER" | "CANCELLED_BY_SELLER" | "CANCELLED_BY_ADMIN" | "STARTED" | "OVERDUE";

  /**Shows the unique code of a subscriber, which might not be the same person who purchased the subscription. */
  subscriber_code: string;

  /** Shows the subscriber's email. */
  subscriber_email: string;

  /** Unique identifier for a transaction, for example, HP17715690036014. A transaction takes place when an order is placed. An order can be the generation of a bank payment slip, an approved purchase, a recurring purchase, and more. */
  transaction: string;

  /** Shows whether the subscription you are looking for has a trial period or not. Some subscriptions may have a trial period at the beginning. */
  trial: boolean;

  /** Subscriptions canceled starting from this date. If no value is entered, the current date minus 30 days will be considered. The date must be in milliseconds, starting from 1970-01-01 00:00:00 UTC. */
  cancelation_date: number;

  /** Subscriptions canceled up until this date. If no value is entered, the current date will be considered. The date must be in milliseconds, starting from 1970-01-01 00:00:00 UTC. */
  end_cancelation_date: number;

  /**
   * The next payment attempt date. In the case of canceled subscriptions, it will indicate the subscriber's last product access date and no charges will be made after this period.
   *
   * E.g.: the subscriber purchased a product that is billed every 10th of the month. If, on the 20th of this month, the subscriber decided to unsubscribe, the date shown in this field will be the 10th of the subsequent month.
   *
   * This information will be returned in milliseconds, as of 1970-01-01 00:00:00 UTC
   *
   * Here, the filter for subscriptions with the next payment attempt date from that date will be applied. If no value is informed, the current date will be considered. The date must be in milliseconds, starting from 1970-01-01 00:00:00 UTC.
   */
  date_next_charge: number;

  /** Here, the filter for subscriptions with the next payment attempt date until this date will be applied. If no value is informed, the current date will be considered. The date must be in milliseconds, starting from 1970-01-01 00:00:00 UTC.*/
  end_date_next_charge: number;
}

export type SubscriptionsGetRequestResponseData = PagedResponse<Subscription[]>;
/**
 * Request parameters schema for the GET subscriptions purchases route:
 * {@link https://developers.hotmart.com/payments/api/v1/subscriptions/:subscriber_code/purchases}
 */
export interface SubscriptionPurchasesGetRequestParameters extends CommonRequest<SubscriptionPurchasesGetRequestParameters> {
  /** An exclusive subscriber code. */
  subscriber_code: string;
}

/**
 * Response data schema for the GET subscriptions purchases route:
 * {@link https://developers.hotmart.com/payments/api/v1/subscriptions/:subscriber_code/purchases}
 */
export type SubscriptionPurchasesGetRequestResponseData = Array<SubscriptionPurchase>;

/**
 * Describes a cancelled subscription
 *
 * {@link https://developers.hotmart.com/docs/en/v1/subscription/cancel-subscription/}
 */
export interface CancelledSubscription {
  status: "ACTIVE" | "INACTIVE";
  subscriber_code: string;
  creation_date: string;
  current_recurrence: number;
  date_last_recurrence: string;
  date_next_charge: string;
  due_day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  trial_period: number;
  interval_type_between_charges: "DAY" | "WEEK" | "MONTH" | "INVOICE";
  interval_between_charges: number;
  max_charge_cycles: number;
  activation_date: string;
  shopper: Shopper;
}

export interface SubscriptionCancelPostRequestParameters {
  subscriber_code: string;
  send_email: boolean;
}

type CancelError = { error: string };

export interface SubscriptionListCancelPostRequestResponseData {
  success_subscriptions: CancelledSubscription[];
  fail_subscriptions: CancelledSubscription[] & CancelError;
}
