import { useState } from "react"

type FetchingResult = [() => Promise<void>, boolean, any];

export default function useFetching(callback: () => void): FetchingResult {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e: unknown | any) {
            setError(e.message)
        } finally {
            setIsLoading(false)

        }
    }

    return [fetching, isLoading, error]
}