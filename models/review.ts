export interface IReview {
    id: string
    createdAt: Date | string | number
    by: {
        _id: string
        fullname: string
        imgUrl: string
        id: string
    }
    txt: string
    moreRate: { [key: string]: number }
}
