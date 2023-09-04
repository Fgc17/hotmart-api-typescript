export type { Environment, EnvironmentUrl, CommonQueryParams, PagedResponse } from './resources/api/api.models';
export type { AccessTokenObjectPostRequest, AccessTokenPostRequestResponse } from './resources/authentication/auth.dto';
export type { AccessTokenObject, HotmartAccessTokenObject } from './resources/authentication/auth.entities';
export type { Secret } from './resources/authentication/auth.models';
export type { ModulesGetRequest, ModulesGetRequestResponse, PagesGetRequest, PagesGetRequestResponse, StudentsGetRequest, StudentsGetRequestResponse } from './resources/membersArea/membersArea.dto';
export type { MemberAreaModule, MemberAreaPage, MemberAreaStudent } from './resources/membersArea/membersArea.entities';
export type { SalesGetRequest, SalesGetRequestResponse } from './resources/sales/sales.dto';
export type { Sale } from './resources/sales/sales.entities';
export type { Purchase, Buyer, Producer, Product, HotmartFee, Offer, Tracking, PaymentType, PaymentMethod, PaymentInfo, Price } from './resources/sales/sales.models';
export type { SubscriptionsGetRequest, SubscriptionsGetRequestResponse, SubscriptionPurchasesGetRequest, SubscriptionPurchasesGetRequestResponse, CancelledSubscription, SubscriptionCancelPostRequest, SubscriptionListCancelPostRequestResponse } from './resources/subscription/subscription.dto';
export type { Subscription, SubscriptionPurchase } from './resources/subscription/subscriptions.entites';
export type { Shopper, Subscriber } from './resources/subscription/subscriptions.models';
