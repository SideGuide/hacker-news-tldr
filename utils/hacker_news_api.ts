import { HNStory } from "types"

export function fetchHN(id: string) : Promise<HNStory>{
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
        return data
        })
}