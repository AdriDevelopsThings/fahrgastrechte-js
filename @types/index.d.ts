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

type BahnFahrgastrechteData = {
    start_station: BahnStation,
    end_station: BahnStation,
    date: BahnDate,
    scheduled_departure: BahnTime,
    scheduled_arrival: BahnTime,
    arrival_date: BahnDate,
    arrival_train: BahnTrain,
    arrival_time: BahnTime,
    first_delayed_train: BahnTrain,
    first_delayed_train_scheduled_departure: BahnTime,
    missed_connecting_train?: BahnStation,
    last_switch?: BahnStation,
    trip_cancelled_station?: BahnStation,
    used_other_transport_station?: BahnStation,
    payment: {
        bank_transfer?: {
            account_ower: FirstnameLastname,
            iban: IBAN,
            bic: BIC,
        }
    },
    person: {
        greeting: Greeting,
        title?: string,
        company?: string,
        name: FirstnameLastname,
        address_addition?: string,
        telephone_number?: TelephoneNumber,
        street: string,
        street_number: number,
        state?: string, // default germany
        postcode: number,
        city: string
    },
    bahncard?: { // Bahncard 100
        number: string,
        birthday: BahnDate
    },
    time_card?: { // = Zeitkarte
        number: string
    },
    advertising_email?: string
}