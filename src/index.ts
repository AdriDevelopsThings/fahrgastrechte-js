import fillPdf from 'fill-pdf'

const fields = {
    'start_station': { name: 'S1F4', max_length: 26 },
    'end_station': { name: 'S1F7', max_length: 26 },
    'date_tt': { name: 'S1F1', max_length: 2 },
    'date_mm': { name: 'S1F2', max_length: 2 },
    'date_yy': { name: 'S1F3', max_length: 2 },
    'scheduled_departure_hh': { name: 'S1F5', max_length: 2 },
    'scheduled_departure_mm': { name: 'S1F6', max_length: 2 },
    'scheduled_arrival_hh': { name: 'S1F8', max_length: 2 },
    'scheduled_arrival_mm': { name: 'S1F9', max_length: 2 },
    'arrival_date_tt': { name: 'S1F10', max_length: 2 },
    'arrival_date_mm': { name: 'S1F11', max_length: 2 },
    'arrival_date_yy': { name: 'S1F12', max_length: 2 },
    'arrival_train_type': { name: 'S1F13', max_length: 3 },
    'arrival_train_number': { name: 'S1F14', max_length: 5 },
    'arrival_hh': { name: 'S1F15', max_length: 2 },
    'arrival_mm': { name: 'S1F16', max_length: 2 },
    'first_delayed_train_type': { name: 'S1F17', max_length: 3 },
    'first_delayed_train_number': { name: 'S1F18', max_length: 5 },
    'first_delayed_train_departure_hh': { name: 'S1F19', max_length: 2 },
    'first_delayed_train_departure_mm': { name: 'S1F20', max_length: 2 },
    'missed_connecting_train': { name: 'S1F21', type: 'bool' },
    'missed_connecting_train_station': { name: 'S1F22', max_length: 14 },
    'last_switch': { name: 'S1F23', type: 'bool' },
    'last_switch_station': { name: 'S1F24', max_length: 14 },
    'trip_cancelled': { name: 'S1F25', type: 'bool' },
    'trip_cancelled_station': { name: 'S1F26', max_length: 14 },
    'used_other_transport': { name: 'S1F27', type: 'bool' },
    'lastused_other_transport_station': { name: 'S1F28', max_length: 14 },
    'payment_method': { name: 'S1F29', type: 'bool' },
    'bank_account_owner': { name: 'S2F20', max_length: 37 },
    'iban': { name: 'S2F21', max_length: 34 },
    'bic': { name: 'S2F22', max_length: 11 },
    'greeting': { name: 'S2F1', type: 'boolean' },
    'title': { name: 'S2F2', max_length: 10 },
    'company': { name: 'S2F3', max_length: 37 },
    'firstname': { name: 'S2F4', max_length: 18 },
    'lastname': { name: 'S2F5', max_length: 18 },
    'address_addition': { name: 'S2F6', max_length: 18 },
    'telephone_number': { name: 'S2F7', max_length: 18 },
    'street': { name: 'S2F8', max_length: 32 },
    'street_number': { name: 'S2F9', max_length: 4 },
    'state': { name: 'S2F10', max_length: 3 },
    'postcode': { name: 'S2F11', max_length: 5 },
    'city': { name: 'S2F12', max_length: 23 },
    'bahncard100': { name: 'S2F13', type: 'boolean'},
    'bahncard100_number': { name: 'S2F15', max_length: 18 },
    'bahncard100_birthday_dd': { name: 'S2F16', max_length: 2 },
    'bahncard100_birthday_mm': { name: 'S2F17', max_length: 2 },
    'bahncard100_birthday_yy': { name: 'S2F18', max_length: 2 },
    'advertising': { name: 'S2F23', type: 'boolean' },
    'advertising_email': { name: 'S2F19', max_length: 37 },    
}

type Data = {
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
        voucher: false,
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
    }
}

export const modifyPdf = (templatePdf: string, data: Data) => {
    const formData = {}
    return new Promise((resolve, reject) => {
        fillPdf.generatePdf(formData, templatePdf, [], (err: Error, output: Buffer) => {
            if (err) {
                reject(err)
            } else {
                resolve(output)
            }
        })
    })
}