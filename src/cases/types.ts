import databaseClient from "../lib/dbClient/databaseClient"

export type defaultResponse = {
  success: boolean
  data?: any
  message?: string
}

export class Repository {
  protected async call<T = any>(name: string, ...values: any[]): Promise<T> {
    try {
      const dbResponse = await databaseClient.$queryRawUnsafe<T>(
        `select * from inr.${name}(${values});`
      )
      return dbResponse[0 as keyof typeof dbResponse] as T
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  protected async list<T = any>(name: string, ...values: any[]): Promise<T> {
    try {
      return (await databaseClient.$queryRawUnsafe<T>(
        `select * from inr.${name}(${values});`
      )) as T
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export class Provider {}

export function postgresStringfy(value: string): string {
  return `'${value}'`
}

export function postgresArray(value: string): string {
  return `'{ ${value} }'`
}

export function postgresObjectArray(arr: Array<any>): string {
  return `ARRAY[${arr.map(item => `'${JSON.stringify(item)}'::JSONB`)}]`
}
