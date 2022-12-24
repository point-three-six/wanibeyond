import useSWR from 'swr'

const fetcher = (url) => {
    fetch(url).then((res) => res.json());
};


export function getDecks() {
    const { data, error, isLoading } = useSWR('/api/decks', fetcher)

    return {
        decks: data,
        isLoading,
        isError: error
    }
}