interface StatusObject {
    [inputURI: string]: Status
}

interface Status {
    status: string | string []
    complete?: boolean
    error?: boolean
}

export const statusObject = {} as StatusObject

export async function updateStatusObject(inputURI: string, status: string | string[], complete?: boolean, error?: boolean) {
    if (!exports.statusObject[inputURI]) {
        statusObject[inputURI] = {} as Status
    }

    statusObject[inputURI].status = status
    if (complete) {
        statusObject[inputURI].complete = true
    }
    if (error) {
        statusObject[inputURI].error = true
    }
}