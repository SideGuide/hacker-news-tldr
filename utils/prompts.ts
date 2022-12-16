import { HNStory, HNStoryCurated } from "types";

export function generatePromptToSummarize(
    story: HNStoryCurated
){
    return `Given this hacker news story, summarize it in 4 paragraphs, including people's comments and details.\nTitle: ${story.title}\nBody: ${story.text}\nTop Comments: ${story.comments}\n`
}