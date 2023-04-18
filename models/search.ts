export interface ISearchBy {
    destination: string
    adults: number
    children: number
    infants: number
    pets: number
    guests: number
    startDate: Date | null
    endDate: Date | null
}
export interface ISearchByOpts {
    destination?: string
    adults?: number
    children?: number
    infants?: number
    pets?: number
    guests?: number
    startDate?: Date | null
    endDate?: Date | null
}
