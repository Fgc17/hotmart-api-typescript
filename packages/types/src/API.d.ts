import * as Authentication from './api/AuthenticationAPI';
import * as Subscription from './api/SubscriptionAPI';
import * as MembersArea from './api/MembersAreaAPI';

export type Environment = 'production' | 'development'

export type EnvironmentUrl = 'https://developers.hotmart.com' | 'https://sandbox.hotmart.com'

export { Authentication, Subscription, MembersArea }