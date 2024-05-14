import { Injectable } from '@nestjs/common';
import * as process from "process";
import axios from "axios";
import {parsePhoneNumber} from "libphonenumber-js";
import {getName} from "country-list"

@Injectable()
export class PbxService {
    private async pbxAuth(){
        const TOKEN = process.env.PBX_TOKEN
        const url = 'https://api2.onlinepbx.ru/bbooster.onpbx.ru/auth.json'
        try{
            const response = await axios.post(url, {
                auth_key: TOKEN,


            })

            if (response.data.status == '1'){
                return response.data.data

            }
            return false
        }catch (e){
            return false
        }

    }
    private async getCallBack(number: string){
        const today = new Date()
        const threeDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4)
        console.log(threeDaysAgo)
        // const unixToday = today.getTime()/1000|0
        const unixThreeDaysAgo = threeDaysAgo.getTime()/1000|0
        let number1
        if (number.includes('+')){
             number1 = number.replace('+', '')
        }else{
             number1 = '+' + number
        }
        const key = await this.pbxAuth()
        if (key){
            const url = `https://api2.onlinepbx.ru/bbooster.onpbx.ru/mongo_history/search.json`
            try{
                const headers = {
                    'Content-Type': 'application/json',
                    'x-pbx-authentication': key.key_id + ':' + key.key,

                }
                // console.log(typeof unixToday)
                const data = {
                    // accountcode: 'inbound',
                    phone_numbers: number,
                    // start_stamp_from:unixThreeDaysAgo,
                    // end_stamp_from: unixThreeDaysAgo,
                    from_host: 'bbooster.onpbx.ru',
                    accountcode: 'outbound'

                }
                const dataWithNumber1 = {
                    phone_numbers: number1,
                    // start_stamp_from:unixThreeDaysAgo,
                    // end_stamp_from: unixToday,
                    from_host: 'bbooster.onpbx.ru',
                    accountcode: 'outbound'

                }

                //
                const response = await axios.post(url, data, {headers})
                if (response.data.data.length !== 0){

                    // console.log(response.data)
                    // let destinationNumber = []
                    // response.data.data.forEach(i => {
                    //     if(i === response.data.data.){
                    //         console.log(i)
                    //
                    //         destinationNumber.push(i.destination_number)
                    //
                    //     }
                        // console.log(i)
                        // destinationNumber.push(i.destination_number)
                    // })
                    // console.log(response.data.data)
                    return response.data.data.pop()['caller_id_number']
                }
                const responseWithNumber1 = await axios.post(url, dataWithNumber1, {headers})
                if(responseWithNumber1.data.data.length !== 0){


                    // let destinationNumber = []
                    // responseWithNumber1.data.data.forEach(i => {
                    //     if(i === response.data.data[0]){
                    //         console.log(i)
                    //         destinationNumber.push(i.destination_number)
                    //
                    //     }
                    // })
                    return responseWithNumber1.data.data.pop()['caller_id_number']
                }

                return 'Ранее никто не звонил клиенту'
            }catch (e){
                return 'err'
            }
        }else return false

    }
    private getCodeCountry(number: string){
        if (number.includes('+')){
            const numberCode = parsePhoneNumber(number);
            if(numberCode){
                try{
                    return getName(`${numberCode.country}`)
                }catch (e){
                    return numberCode.country
                }
                // return numberCode.country

            }else return false

        }else{
            const numberCode = parsePhoneNumber('+' + number);
            if(numberCode){
                try{
                    return getName(`${numberCode.country}`)
                }catch (e){
                    return numberCode.country
                }

            }else return false

        }



    }
    async postCalledMessage(body: any){
        let text
        const callDuration = Number(body.call_duration)

        const country = this.getCodeCountry(body.caller)
        const historyByNumber = await this.getCallBack(body.caller)
        console.log(historyByNumber)

        if(callDuration > 2){
             text = `Пропущенный звонок с номера ${body.caller}\nКто звонил ранее: ${historyByNumber}\nСтрана ${country}\nВремя звонка: ${body.call_duration}`

        }else{
             text = `#Короткий(меньше 1-2сек)\nПропущенный звонок с номера ${body.caller}\nКто звонил ранее: ${historyByNumber}\nСтрана ${country}\nВремя звонка: ${body.call_duration}`

        }

        // const text = `Пропущенный звонок с номера ${body.caller}\nКто звонил ранее: ${historyByNumber}\nСтрана ${country}\nВремя дозвона: ${body.call_duration}`
        const TOKEN = process.env.CALLED_MISS_BOT
        const chat_id = process.env.CALLED_MISS_CHAT
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`
        try{
            const response = await axios.post(url, {
                chat_id: chat_id,
                text: text

            })
            return response
        }catch (e){
            return 'err'
        }

    }

}
