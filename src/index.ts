import fillPdf from 'fill-pdf'

const fields: { [key: string]: { name: string, max_length?: number, type?: string }} = {
    'start_station': { name: 'S1F4', max_length: 26 },
    'end_station': { name: 'S1F7', max_length: 26 },
    'date_tt': { name: 'S1F1', max_length: 2 },
    'date_mm': { name: 'S1F2', max_length: 2 },
    'date_yy': { name: 'S1F3', max_length: 2 },
    'scheduled_departure_hh': { name: 'S1F5', max_length: 2 },
    'scheduled_departure_mm': { name: 'S1F6', max_length: 2 },
    'scheduled_arrival_hh': { name: 'S1F8', max_length: 2 },
    'scheduled_arrival_mm': { name: 'S1F9', max_length: 2 },
    'arrival_date_dd': { name: 'S1F10', max_length: 2 },
    'arrival_date_mm': { name: 'S1F11', max_length: 2 },
    'arrival_date_yy': { name: 'S1F12', max_length: 2 },
    'arrival_train_type': { name: 'S1F13', max_length: 3 },
    'arrival_train_number': { name: 'S1F14', max_length: 5 },
    'arrival_hh': { name: 'S1F15', max_length: 2 },
    'arrival_mm': { name: 'S1F16', max_length: 2 },
    'first_delayed_train_type': { name: 'S1F17', max_length: 3 },
    'first_delayed_train_number': { name: 'S1F18', max_length: 5 },
    'first_delayed_train_scheduled_departure_hh': { name: 'S1F19', max_length: 2 },
    'first_delayed_train_scheduled_departure_mm': { name: 'S1F20', max_length: 2 },
    'missed_connecting_train': { name: 'S1F21', type: 'bool' },
    'missed_connecting_train_station': { name: 'S1F22', max_length: 14 },
    'last_switch': { name: 'S1F23', type: 'bool' },
    'last_switch_station': { name: 'S1F24', max_length: 14 },
    'trip_cancelled': { name: 'S1F25', type: 'bool' },
    'trip_cancelled_station': { name: 'S1F26', max_length: 14 },
    'used_other_transport': { name: 'S1F27', type: 'bool' },
    'used_other_transport_station': { name: 'S1F28', max_length: 14 },
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

const yearSize = (year: number, length: number) => {
    if (String(year).length <= 2) {
        return String(year).padStart(2, '0')
    } else {
        return String(year).slice(String(year).length - length)
    }
}

export const modifyPdf = (templatePdf: string, data: BahnFahrgastrechteData): Promise<Buffer> => {
    const formData: { [key: string]: string } = {
        'start_station': data.start_station,
        'end_station': data.end_station,
        'date_tt': String(data.date.day).padStart(2, '0'),
        'date_mm': String(data.date.month).padStart(2, '0'),
        'date_yy': yearSize(data.date.year, 2),
        'scheduled_departure_hh': String(data.scheduled_departure.hour).padStart(2, '0'),
        'scheduled_departure_mm': String(data.scheduled_departure.minute).padStart(2, '0'),
        'scheduled_arrival_hh': String(data.scheduled_arrival.hour).padStart(2, '0'),
        'scheduled_arrival_mm': String(data.scheduled_arrival.minute).padStart(2, '0'),
        'arrival_date_dd': String(data.arrival_date.day).padStart(2, '0'),
        'arrival_date_mm': String(data.arrival_date.month).padStart(2, '0'),
        'arrival_date_yy': yearSize(data.arrival_date.year, 2),
        'arrival_train_type': data.arrival_train.train_type,
        'arrival_train_number': String(data.arrival_train.train_number),
        'arrival_hh': String(data.arrival_time.hour).padStart(2, '0'),
        'arrival_mm': String(data.arrival_time.minute).padStart(2, '0'),
        'first_delayed_train_type': data.first_delayed_train.train_type,
        'first_delayed_train_number': String(data.first_delayed_train.train_number),
        'first_delayed_train_scheduled_departure_hh': String(data.first_delayed_train_scheduled_departure.hour).padStart(2, '0'),
        'first_delayed_train_scheduled_departure_mm': String(data.first_delayed_train_scheduled_departure.minute).padStart(2, '0'),
        'greeting': data.person.greeting,
        'firstname': data.person.name.firstname,
        'lastname': data.person.name.lastname,
        'street': data.person.street,
        'street_number': String(data.person.street_number),
        'postcode': String(data.person.postcode),
        'city': data.person.city,
    }

    if (data.missed_connecting_train) {
        formData['missed_connecting_train'] = 'Ja'
        formData['missed_connecting_train_station'] = data.missed_connecting_train
    }

    if (data.last_switch) {
        formData['last_switch'] = 'Ja'
        formData['last_switch_station'] = data.last_switch
    }

    if (data.trip_cancelled_station) {
        formData['trip_cancelled'] = 'Ja'
        formData['trip_cancelled_station'] = data.trip_cancelled_station
    }

    if (data.used_other_transport_station) {
        formData['used_other_transport'] = 'Ja'
        formData['used_other_transport_station'] = data.used_other_transport_station
    }

    if (data.payment.bank_transfer) {
        formData['bank_account_owner'] = data.payment.bank_transfer.account_ower.lastname + ', ' + data.payment.bank_transfer.account_ower.firstname
        formData['iban'] = data.payment.bank_transfer.iban
        formData['bic'] = data.payment.bank_transfer.bic
        formData['payment_method'] = 'Auszahlung in der Verkaufsstelle oder Überweisung'
    } else {
        formData['payment_method'] = 'Gutschein'
    }

    if (data.person.address_addition) {
        formData['address_addition'] = data.person.address_addition
    }

    if (data.person.company) {
        formData['company'] = data.person.company
    }

    if (data.person.state) {
        formData['state'] = data.person.state
    }

    if (data.person.telephone_number) {
        formData['telephone_number'] = data.person.telephone_number
    }

    if (data.person.title) {
        formData['title'] = data.person.title
    }

    if (data.bahncard) {
        formData['bahncard100'] = 'BahnCard 100-Nr.'
        formData['bahncard100_number'] = data.bahncard.number
        formData['bahncard100_birthday_dd'] = String(data.bahncard.birthday.day).padStart(2, '0')
        formData['bahncard100_birthday_mm'] = String(data.bahncard.birthday.month).padStart(2, '0')
        formData['bahncard100_birthday_yy'] = yearSize(data.bahncard.birthday.year, 4)
    } else if (data.time_card) {
        formData['bahncard100'] = 'Zeitkarten-Nr.'
        formData['bahncard100_number'] = data.time_card.number
    }

    if (data.advertising_email) {
        formData['advertising'] = 'Ja'
        formData['advertising_email'] = data.advertising_email
    }

    const parsedForm: { [key: string]: string } = {}
    for (const [key, value] of Object.entries(formData)) {
        parsedForm[fields[key].name] = value
    }

    return new Promise((resolve, reject) => {
        fillPdf.generatePdf(parsedForm, templatePdf, [], (err: Error, output: Buffer) => {
            if (err) {
                reject(err)
            } else {
                resolve(output)
            }
        })
    })
}