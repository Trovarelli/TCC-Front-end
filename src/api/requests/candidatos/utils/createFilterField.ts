import { CandidatoModel } from "@/api/models";
import { AxiosResponse } from "axios";

export const createFilterFieldArray = (response: AxiosResponse<CandidatoModel[], undefined>) => {    
    const data = response.data.map((c) => {
        const filterField:string[] = []
        for (const key in c) {
            if (c.hasOwnProperty(key) && key !== 'userId' && key !== 'curriculo' && key !== 'texto' && key !== 'favorito' && key !== '_id') {
                let element = c[key as keyof typeof c]
                if (element && Array.isArray(element)) {
                    element.forEach((e) => {
                        const splitedElement = String(e).split(' ')
                        splitedElement.forEach((s) => filterField.push(`${key}:${s.toLowerCase().replace(/[^\w\s]/gi, "")}`))
                    })
                }
                if(element) {
                    if(typeof element === 'boolean') element = element ? 'sim' : 'nao'
                    const splitedElement = String(element).split(' ')
                    splitedElement.forEach((s) => filterField.push(`${key}:${s.toLowerCase().replace(/[^\w\s]/gi, "")}`))
                }
            }
        }
        return {
            ...c,
            filterField
        }
    })

    return {
        ...response,
        data
    }
}

export const createFilterField = (response: AxiosResponse<CandidatoModel, undefined>) => {
    let data = response.data
    
    const filterField:string[] = []
    for (const key in data) {
        if (data.hasOwnProperty(key) && key !== 'userId' && key !== 'curriculo' && key !== 'texto' && key !== 'favorito' && key !== '_id') {
            let element = data[key as keyof typeof data] as string | string[] | boolean
            if (element && Array.isArray(element)) {
                element.forEach((e) => {
                    const splitedElement = String(e).split(' ')
                    splitedElement.forEach((s) => filterField.push(`${key}:${s.toLowerCase().replace(/[^\w\s]/gi, "")}`))
                })
            }
            if(element) {
                if(typeof element === 'boolean') element = element ? 'sim' : 'nao'
                const splitedElement = String(element).split(' ')
                splitedElement.forEach((s) => filterField.push(`${key}:${s.toLowerCase().replace(/[^\w\s]/gi, "")}`))
            }
        }
    }

    data = {
        ...data,
        filterField
    }

    return {
        ...response,
        data
    }
}