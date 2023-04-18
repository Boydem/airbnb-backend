import { Host } from './host'
import { IReview } from './review'
import { User } from './user'

export interface IStay {
    _id: string
    name: string
    type: string
    imgUrls: string[]
    price: number
    summary: string
    amenities: string[]
    roomType: string
    host: Host
    loc: ILocation
    reviews: IReview[]
    likedByUsers: User[]
    labels: string[]
    stayDetails: { [key: string]: number }
    avgRates?: { [k: string]: number }
    avgRate: string
    filters: string[]
    region: string
}
export interface IStayPreview {
    _id: string
    name: string
    type: string
    imgUrls: string[]
    price: number
    isSuperHost: boolean
    loc: ILocation
    avgRate: string
    labels: string[]
    region: string
    // likedByUser: boolean;
}

export interface ILocation {
    country: string
    countryCode: string
    city: string
    address: string
    lat: number
    lng: number
}

export interface ILatLngPoint {
    lat: number
    lng: number
}
