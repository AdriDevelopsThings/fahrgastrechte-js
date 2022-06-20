type BahnDate = {
    day: number,
    month: number,
    year: number
}

type BahnTime = {
    hour: number,
    minute: number
}

type BahnTrain = {
    train_type: string
    train_number: number
}

type BahnStation = string
type IBAN = string
type BIC = string
type FirstnameLastname = {
    firstname: string,
    lastname: string
}
type Greeting = 'Herr' | 'Frau'
type TelephoneNumber = string