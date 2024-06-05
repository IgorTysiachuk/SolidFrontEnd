import { useState } from "react"

type FetchingResult = [(data: any) => Promise<void>, boolean, any];

export default function useFetchingWithData(callback: (data: any) => void): FetchingResult {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (data: any) => {
        try {
            setIsLoading(true)
            await callback(data)
        } catch (e: unknown | any) {
            setError(e.message)
        } finally {
            setIsLoading(false)

        }
    }

    return [fetching, isLoading, error]
}