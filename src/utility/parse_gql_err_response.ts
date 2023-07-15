// error comes from errorr.response in the cathc block of graphql response
export interface IGQLErrrorResponse {
    errors: Error[]
    status: number
    headers: Headers
}

export interface IGQLErrrorResponseError {
    path: string[]
    extensions: IGQLErrrorResponseExtensions
    locations: Location[]
    message: string
}

export interface IGQLErrrorResponseExtensions {
    code: string
    variableName: string
    typeName: string
    argumentName: string
    errorMessage: string
}

export interface IGQLErrrorResponseLocation {
    line: number
    column: number
}

export interface IGQLErrrorResponseHeaders {
    map:{ [key: string]: string}
}



export function parseGQLError(gql_err: IGQLErrrorResponse) {
if(Array.isArray(gql_err.errors)){
    const errors_messages_arr = gql_err?.errors?.flatMap((error) => {
        return error?.message
    })
    const error_string = errors_messages_arr?.reduce((acc, cur) => {
        return acc + cur + "\n"
    })
    return error_string
}
return "something went wrong"
}
