export interface EventDataToSend extends EventData {
  eventOwnerId: string
  eventOwnerName: string
  eventOwnerEmail: string
}

interface Attendee {
  type: 'booking'
  bookingId: string
  userId: string
  userName: string
  userEmail: string
}

interface Item {
  eventId: string
  eventOwnerId: string
  eventOwnerName: string
  eventOwnerEmail: string
  eventPrice: string
  eventLink: string
  type: 'booking' | 'event'
  eventTitle: string
  eventDescription: string
  eventCategory: 'Travel' | 'Other'
  eventLocation: string
  eventDateAndTime: string
  eventPhotos: string[]
}

export interface EventDataReceived {
  items: Array<Item | Attendee>
  count: number | string
}

export interface EventData {
  type: 'booking' | 'event'
  eventTitle: string
  eventDescription: string
  eventCategory: 'Travel' | 'Other'
  eventLocation: string
  eventDate: string
  eventTime: string
  eventPrice: string
  eventLink: string
}

interface UserInfo {
  email: string
  email_verified: string
  family_name: string
  name: string
  sub: string
}
export type AuthResponse = {
  verified: boolean
  userInfo: UserInfo | null
}

export interface User {
  AccessToken: string
  ExpiresIn: number
  IdToken: string
  RefreshToken: string
  TokenType: string
  msg: string
  userInfo: UserInfo
}

export interface LoginData {
  email: string
  password: string
}

export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

export interface LoginMessage {
  message: string
}

export type LoginError = string | null

export interface RegisterData {
  name: string
  lastName: string
  email: string
  password: string
  // location?: string
}

export interface CreateUserResponse {
  message: string
  error?: { message: string }
}

export interface UserData {
  name: string
  surname: string
  email: string
  password: string
}

export type ResponseError = string | null

export interface LoginResponse {
  message: string | null
  error: {
    message: string
    name: string
  } | null
  userInfo: UserInfo | null
}
export interface MetaDataProps {
  params: { id: string }
}
