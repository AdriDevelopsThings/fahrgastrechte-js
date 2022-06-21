# fahrgastrechte-js
A nodejs library to modify the template of the fahrgastrechte form (PDF).

## Installation
``yarn add fahrgastrechte-js``

## How to use?

```javascript
import { modifyPdf } from 'fahrgastrechte-js'

const pdfBuffer = await modifyPdf(
    'fahrgastrechte.pdf', // You will need the fahrgastrechte.pdf template pdf from https://www.bahn.de/wmedia/view/mdb/media/intern/fahrgastrechteformular.pdf
    { } // Data parameters 'BahnFahrgastrechteData'
)
// you can save the pdfBuffer to a file for example
```

The data parameters must be this type:
```javascript
type BahnFahrgastrechteData = {
    start_station: BahnStation, // string
    end_station: BahnStation, // string
    date: BahnDate, // { day: 12, month: 13, year: 22 }
    scheduled_departure: BahnTime, // { hour: 12, minute: 23 }
    scheduled_arrival: BahnTime, // { hour: 12, minute: 23 }
    arrival_date: BahnDate, // { day: 12, month: 13, year: 22 }
    arrival_train: BahnTrain, // { train_type: 'ICE', train_number: 879 }
    arrival_time: BahnTime, // arrival time of arrival_train
    first_delayed_train: BahnTrain, // { train_type: 'ICE', train_number: 879 }
    first_delayed_train_scheduled_departure: BahnTime, // { hour: 12, month: 21 }
    // the 4 options in the form
    missed_connecting_train?: BahnStation, // string
    last_switch?: BahnStation, // string
    trip_cancelled_station?: BahnStation, // string
    used_other_transport_station?: BahnStation, // string
    payment: { // { payment: {} } means voucher 
        bank_transfer?: {
            account_ower: FirstnameLastname, // { firstname: '', lastname: '' }
            iban: IBAN, // string
            bic: BIC, // string
        }
    },
    person: {
        greeting: Greeting, // 'Herr' or 'Frau'
        title?: string, // e.g. Dr. or Prof.
        company?: string,
        name: FirstnameLastname, // { train_type: 'ICE', train_number: 879 }
        address_addition?: string,
        telephone_number?: TelephoneNumber, // string
        street: string,
        street_number: number,
        state?: string, // default germany
        postcode: number,
        city: string
    },
    // you can pass the bahncard OR the time_card 
    bahncard?: { // Bahncard 100
        number: string,
        birthday: BahnDate // { day: 12, month: 3, year: 2022 }
    },
    time_card?: { // = Zeitkarte
        number: string
    },
    advertising_email?: string // if you want to get ads pass an email address
}
```