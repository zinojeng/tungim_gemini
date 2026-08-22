const STRONG_SPAN = /(\*\*|__)([^\n]*?)\1/gu
const ENDS_WITH_PUNCTUATION_OR_SYMBOL = /[\p{P}\p{S}]$/u
const STARTS_WITH_LETTER_OR_NUMBER = /^[\p{L}\p{N}]/u

/**
 * CommonMark does not close a strong-emphasis span when punctuation inside the
 * closing delimiter is followed immediately by a letter or number. This is
 * especially visible in Chinese prose, where spaces are normally omitted:
 * `**17%**具有` would otherwise be rendered with the literal `**` markers.
 *
 * An empty HTML comment creates a valid delimiter boundary without inserting a
 * visible space into Chinese text. ENDO notes already use rehype-raw for trusted
 * local article content, so the comment disappears from the rendered output.
 */
export function normalizeEndoMarkdown(markdown: string) {
    return markdown.replace(
        STRONG_SPAN,
        (match, delimiter: string, content: string, offset: number, source: string) => {
            const previousCharacter = [...source.slice(0, offset)].at(-1) ?? ""
            const firstContentCharacter = [...content][0] ?? ""
            const nextCharacter = [...source.slice(offset + match.length)][0] ?? ""
            const needsOpeningBoundary = STARTS_WITH_LETTER_OR_NUMBER.test(previousCharacter)
                && ENDS_WITH_PUNCTUATION_OR_SYMBOL.test(firstContentCharacter)
            const needsClosingBoundary = ENDS_WITH_PUNCTUATION_OR_SYMBOL.test(content)
                && STARTS_WITH_LETTER_OR_NUMBER.test(nextCharacter)

            return `${needsOpeningBoundary ? "<!-- -->" : ""}${match}${needsClosingBoundary ? "<!-- -->" : ""}`
        },
    )
}
